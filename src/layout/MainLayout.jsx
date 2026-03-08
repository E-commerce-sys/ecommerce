import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import Button from "../components/Button";
import Input from "../components/Input";
import CartSummary from "../features/cart/CartSummary";
import Discounts from "../features/home/Discounts";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
        <CartSummary name="RGB liquid CPU Cooler" prev_price="170$" new_price="160$"/>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
