import Button from "../../components/Button";
import WishlistItem from "./WishlistItem";
import { useTranslation } from "react-i18next";
import {getItemAmount} from "./wishlistAPI";
import { useState,useEffect } from "react";

function WishlistSection() {
  const {t}=useTranslation()
  const [count, setCount] = useState(0);

useEffect(() => {
  async function fetchCount() {
    const data = await getItemAmount();
    setCount(data?? 0);
  }
  fetchCount();
}, []);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px]">
          {t("wishlist.wishlist")} ({count})
        </h1>

        <Button variant="outline">
          {t("wishlist.moveToCart")}
        </Button>
      </div>

      {/* Products */}
      <div className="flex">
        <WishlistItem/>
      </div>

    </section>
  );
}

export default WishlistSection;