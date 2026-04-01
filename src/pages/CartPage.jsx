/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

import Items from "../features/basket/Items";
import CartTotal from "../features/basket/CartTotal";
import Spinner from "../components/Spinner"; // ✅ your spinner

import { useCart } from "../context/CartContext";

function CartPage() {
  const { fetchCart, loading } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ LOADER
  if (loading) {
    return (
      <div className="mt-17 flex justify-center items-center h-[50vh]">
        <Spinner />
      </div>
    );
  }

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
