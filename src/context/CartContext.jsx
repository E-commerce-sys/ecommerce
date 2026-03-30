/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 140 ? 0 : 20;
  const total = subtotal + shipping;

  //  update quantity
  function updateQuantity(id, value) {
    // allow empty input (user typing)
    if (value === "") {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: "" } : item)),
      );
      return;
    }

    const quantity = Number(value);

    // ignore invalid numbers
    if (isNaN(quantity) || quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function updateColor(itemId, colorId) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;

        const selectedColor = item.colors.find((c) => c.id === colorId);

        if (!selectedColor) return item;

        // ✅ find first available size
        const availableSize = selectedColor.sizes.find(
          (size) => size.stock > 0,
        );

        return {
          ...item,
          selectedColorId: colorId,
          selectedSizeId: availableSize ? availableSize.id : null,
        };
      }),
    );
  }

  function updateSize(itemId, sizeId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, selectedSizeId: sizeId } : item,
      ),
    );
  }

  // 👉 delete item
  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // 👉 set from API later
  function setCart(data) {
    setCartItems(data);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        subtotal,
        shipping,
        total,
        setCartItems,
        updateQuantity,
        updateColor,
        updateSize,
        removeItem,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 👉 custom hook (clean usage)
export function useCart() {
  return useContext(CartContext);
}
