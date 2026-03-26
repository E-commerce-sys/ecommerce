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
        img: monitor,
        name: "LCD Monitor",
        price: 65,
        quantity: 1,
      },
      {
        id: 2,
        img: gamePad,
        name: "H1 Gamepad",
        price: 30,
        quantity: 2,
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
