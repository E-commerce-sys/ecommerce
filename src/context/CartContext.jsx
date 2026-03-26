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

  // 👉 update quantity
  function updateQuantity(id, value) {
    // allow empty input
    if (value === "") {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: "" } : item)),
      );
      return;
    }

    const quantity = Number(value);

    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
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
