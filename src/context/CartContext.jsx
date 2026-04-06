/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  getCartItems,
  mapCartItemsFromResponse,
  mapCartTotalsFromResponse,
  formatMoneyTwoDecimals,
} from "../features/basket/api/getCartItems";
import { updateCart } from "../features/basket/api/updateCart";
import { removeCart } from "../features/basket/api/removeCart";

const CartContext = createContext();

function applyCartFromGetResponse(setCartItems, setCartTotals, apiBody) {
  if (!apiBody?.data) return;
  setCartItems(mapCartItemsFromResponse(apiBody));
  setCartTotals(mapCartTotalsFromResponse(apiBody));
}

/**
 * PATCH/DELETE may return totals but sparse `included.cartItems`. If mapped lines
 * do not match relationship count, refetch full cart (GET includes variants).
 */
async function applyCartFromMutationResponse(setCartItems, setCartTotals, apiBody) {
  if (!apiBody?.data) return;

  setCartTotals(mapCartTotalsFromResponse(apiBody));

  const relCount = apiBody.data.relationships?.cartItems?.data?.length ?? 0;
  if (relCount === 0) {
    setCartItems([]);
    return;
  }

  const mapped = mapCartItemsFromResponse(apiBody);
  if (mapped.length === relCount) {
    setCartItems(mapped);
    return;
  }

  try {
    const full = await getCartItems();
    applyCartFromGetResponse(setCartItems, setCartTotals, full);
  } catch (err) {
    console.error("Failed to refresh cart after mutation", err);
    setCartItems(mapped);
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    shippingCost: 0,
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(false);

  const cartItemsRef = useRef(cartItems);
  cartItemsRef.current = cartItems;

  const subtotalFormatted = useMemo(
    () => formatMoneyTwoDecimals(cartTotals.subtotal),
    [cartTotals.subtotal],
  );
  const shippingFormatted = useMemo(
    () => formatMoneyTwoDecimals(cartTotals.shippingCost),
    [cartTotals.shippingCost],
  );
  const totalFormatted = useMemo(
    () => formatMoneyTwoDecimals(cartTotals.totalPrice),
    [cartTotals.totalPrice],
  );

  const persistCartItemQuantity = useCallback(async (cartItemId, quantity) => {
    const q = Number(quantity);
    if (isNaN(q) || q < 1) return;
    try {
      const apiBody = await updateCart(cartItemId, { quantity: q });
      await applyCartFromMutationResponse(setCartItems, setCartTotals, apiBody);
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  }, []);

  const flushPendingCartSync = useCallback(async () => {
    const items = cartItemsRef.current;
    const valid = items.filter(
      (i) => i.quantity !== "" && Number(i.quantity) >= 1,
    );
    if (valid.length === 0) return;

    for (const i of valid) {
      try {
        const apiBody = await updateCart(i.id, { quantity: Number(i.quantity) });
        await applyCartFromMutationResponse(setCartItems, setCartTotals, apiBody);
      } catch (err) {
        console.error("Failed to sync cart item", i.id, err);
      }
    }
  }, []);

  const updateQuantity = useCallback((id, value) => {
    if (value === "") {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: "" } : item)),
      );
      return;
    }

    const quantity = Number(value);
    if (isNaN(quantity) || quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback(async (cartItemId) => {
    try {
      const apiBody = await removeCart(cartItemId);
      await applyCartFromMutationResponse(setCartItems, setCartTotals, apiBody);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const apiBody = await getCartItems();
      applyCartFromGetResponse(setCartItems, setCartTotals, apiBody);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      loading,
      subtotal: subtotalFormatted,
      shipping: cartTotals.shippingCost,
      shippingFormatted,
      total: totalFormatted,
      updateQuantity,
      removeItem,
      fetchCart,
      flushPendingCartSync,
      persistCartItemQuantity,
    }),
    [
      cartItems,
      loading,
      subtotalFormatted,
      cartTotals.shippingCost,
      shippingFormatted,
      totalFormatted,
      updateQuantity,
      removeItem,
      fetchCart,
      flushPendingCartSync,
      persistCartItemQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
