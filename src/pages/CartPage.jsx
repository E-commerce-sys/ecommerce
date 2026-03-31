/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

import Items from "../features/basket/Items";
import CartTotal from "../features/basket/CartTotal";

import monitor from "../assets/img/Monitor-Cart-Small.svg";
import gamePad from "../assets/img/Gamepad-Cart-Small.svg";

import { useCart } from "../context/CartContext";

function CartPage() {
  // eslint-disable-next-line no-unused-vars
  const { cartItems, setCart } = useCart();

  // LATER FOR API
  //   useEffect(() => {
  //   async function fetchCart() {
  //     const data = await getCartItems(); // your API
  //     setCartItems(data);
  //   }

  //   fetchCart();
  // }, []);

  useEffect(() => {
    setCart([
      {
        id: 1,
        productId: 12,
        img: monitor,
        name: "LCD Monitor",
        price: 65,
        quantity: 1,

        selectedColorId: 1,
        selectedSizeId: 2,

        colors: [
          {
            id: 1,
            name: "Red",
            totalStock: 0,
            sizes: [
              { id: 1, name: "Small", stock: 10 },
              { id: 2, name: "Medium", stock: 20 },
              { id: 3, name: "Large", stock: 30 },
            ],
          },
          {
            id: 2,
            name: "Blue",
            totalStock: 40,
            sizes: [
              { id: 4, name: "Small", stock: 0 },
              { id: 5, name: "Medium", stock: 10 },
              { id: 6, name: "Large", stock: 20 },
            ],
          },
        ],
      },
      {
        id: 2,
        productId: 10,
        img: gamePad,
        name: "Game Pad",
        price: 30,
        quantity: 2,

        selectedColorId: 1,
        selectedSizeId: 2,

        colors: [
          {
            id: 1,
            name: "Orange",
            totalStock: 60,
            sizes: [
              { id: 1, name: "Small", stock: 10 },
              { id: 2, name: "Medium", stock: 20 },
              { id: 3, name: "Large", stock: 30 },
            ],
          },
          {
            id: 2,
            name: "Black",
            totalStock: 40,
            sizes: [
              { id: 4, name: "Small", stock: 10 },
              { id: 5, name: "Medium", stock: 10 },
              { id: 6, name: "Large", stock: 20 },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="mt-17">
      <div className="flex flex-col lg:block">
        <Items />
        <CartTotal />
      </div>
    </div>
  );
}
export default CartPage;
