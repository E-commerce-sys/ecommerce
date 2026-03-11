import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Spinner from "../components/Spinner";

import Button from "../components/Button";
import Input from "../components/Input";
import CartSummary from "../features/cart/CartSummary";
import Discounts from "../features/home/Discounts";
import PriceFilter from "../features/products/filters/PriceFilter";
import DiscountFilter from "../features/products/filters/DiscountFilter";

function MainLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Page content */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Spinner />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
