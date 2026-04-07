/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

import Items from "../features/basket/Items";
import CartTotal from "../features/basket/CartTotal";
import Spinner from "../components/Spinner";

import { useCart } from "../context/CartContext";
import { CheckoutAddressProvider } from "../context/CheckoutAddressContext";
import Adress from "../features/basket/Adress";

function CartPage() {
  const { fetchCart, loading } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return (
      <div className="mt-17 flex h-[50vh] items-center justify-center px-4">
        <Spinner />
      </div>
    );
  }

  return (
    <CheckoutAddressProvider>
      <div className="mt-17 w-full min-w-0">
        <Items />
        <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-10 px-4 py-8 md:px-8 md:py-12 lg:flex-row lg:justify-center lg:gap-30 lg:px-10 lg:py-20 xl:px-20">
          <div className="min-w-0 w-full lg:w-auto lg:max-w-none lg:flex-1 lg:shrink">
            <Adress />
          </div>
          <div className="min-w-0 w-full shrink-0 lg:w-auto">
            <CartTotal />
          </div>
        </div>
      </div>
    </CheckoutAddressProvider>
  );
}

export default CartPage;
