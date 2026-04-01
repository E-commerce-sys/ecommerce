/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useState } from "react";
import { getCartItems } from "../features/basket/api/getCartItems";

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

  // ✅ quantity
  function updateQuantity(id, value) {
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
  }

  // ✅ color (no sizes inside color anymore)
  function updateColor(itemId, colorId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              selectedColorId: colorId,
            }
          : item,
      ),
    );
  }

  // ✅ size
  function updateSize(itemId, sizeId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, selectedSizeId: sizeId } : item,
      ),
    );
  }

  // ✅ delete
  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // ✅ FETCH + TRANSFORM API
  async function fetchCart() {
    try {
      setLoading(true);

      const res = await getCartItems();
      const cartItemsRaw = res.data.included.cartItems;

      const mapped = cartItemsRaw.map((item) => {
        const product = item.included.product;

        const productColors = product.included.productColors || [];
        const productSizes = product.included.productSizes || [];

        const colors = productColors.map((c) => ({
          id: Number(c.id),
          name: c.attributes.name,
        }));

        const sizes = productSizes.map((s) => ({
          id: Number(s.id),
          name: s.attributes.name,
        }));

        return {
          id: Number(item.id),
          productId: Number(product.id),
          img: product.attributes.primaryImage,

          nameEn: product.attributes.nameEn,
          nameAr: product.attributes.nameAr,
          nameKu: product.attributes.nameKu,

          price: Number(item.attributes.unitPrice),
          quantity: item.attributes.quantity,

          selectedColorId:
            item.relationships.productColor.data?.id ||
            (colors.length > 0 ? colors[0].id : null),

          selectedSizeId:
            item.relationships.productSize.data?.id ||
            (sizes.length > 0 ? sizes[0].id : null),

          colors,
          sizes,
        };
      });

      setCartItems(mapped);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        subtotal,
        shipping,
        total,
        updateQuantity,
        updateColor,
        updateSize,
        removeItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
