/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Items from "../features/basket/Items";
import CartTotal from "../features/basket/CartTotal";

import monitor from "../assets/img/Monitor-Cart-Small.svg";
import gamePad from "../assets/img/Gamepad-Cart-Small.svg";
import { useState } from "react";
function CartPage() {
  // LATER FOR API
  //   useEffect(() => {
  //   async function fetchCart() {
  //     const data = await getCartItems(); // your API
  //     setCartItems(data);
  //   }

  //   fetchCart();
  // }, []);

  const [cartItems, setCartItems] = useState([
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
    {
      id: 3,
      img: gamePad,
      name: "H1 Gamepad",
      price: 30,
      quantity: 2,
    },
  ]);

  return (
    <div>
      <Items cartItems={cartItems} setCartItems={setCartItems} />
      <CartTotal cartItems={cartItems} />
    </div>
  );
}
export default CartPage;
