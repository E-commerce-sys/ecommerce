import { Link } from "react-router-dom";
import JustForYou from "./JustForYou";
import WishlistSection from "./WishlistSection";
import { useTranslation } from "react-i18next";

function Wishlist() {
    // async function getItems(){
    //     const data = await getWishlist()
    //     console.log(data)
    // }
    // getItems()
    const {t}= useTranslation()
  return <div className="mt-20 mb-[222px] flex flex-col gap-20">
    <div className="mx-[100px]">
        <span className="text-[rgb(var(--color-text-main-2))]">
          <Link to="/">{t("contact.home")}</Link> /
        </span>

        <span className="text-[rgb(var(--color-text-main))] ml-1">
          {t("wishlist.wishlist")}
        </span>
      </div>
    <WishlistSection/>
    <JustForYou/>
  </div>;
}

export default Wishlist;