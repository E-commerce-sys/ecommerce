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
} from "../features/basket/api/getCartItems";
import { updateCart } from "../features/basket/api/updateCart";
import { removeCart } from "../features/basket/api/removeCart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const subtotal = Number(
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2),
  );

  const shipping = subtotal > 140 ? 0 : 20;
  const total = Number((subtotal + shipping).toFixed(2));
  const [loading, setLoading] = useState(false);

  const cartItemsRef = useRef(cartItems);
  cartItemsRef.current = cartItems;

  const persistCartItemQuantity = useCallback(async (cartItemId, quantity) => {
    const q = Number(quantity);
    if (isNaN(q) || q < 1) return;
    try {
      await updateCart(cartItemId, { quantity: q });
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  }, []);

  const getLatestCartItems = useCallback(() => cartItemsRef.current, []);

  const flushPendingCartSync = useCallback(async () => {
    const items = cartItemsRef.current;
    const valid = items.filter(
      (i) => i.quantity !== "" && Number(i.quantity) >= 1,
    );
    if (valid.length === 0) return;

    await Promise.all(
      valid.map((i) => updateCart(i.id, { quantity: Number(i.quantity) })),
    );
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
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));

      await removeCart(cartItemId);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getCartItems();
      const mapped = mapCartItemsFromResponse(res);

      setCartItems(mapped);
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
      subtotal,
      shipping,
      total,
      updateQuantity,
      removeItem,
      fetchCart,
      flushPendingCartSync,
      persistCartItemQuantity,
      getLatestCartItems,
    }),
    [
      cartItems,
      loading,
      subtotal,
      shipping,
      total,
      updateQuantity,
      removeItem,
      fetchCart,
      flushPendingCartSync,
      persistCartItemQuantity,
      getLatestCartItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
