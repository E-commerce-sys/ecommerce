import { useState } from "react";
import CartItem from "./CartItem";
import FullStar from "../../assets/icons/filled-star-Icon.svg";
import EmptyStar from "../../assets/icons/empty-star.svg";
import { isLoggedIn } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgProduct from "../../assets/img/Cart.png";

function CartItemSummary({ product }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  const attributes = product.attributes;

  /* ---------- LANGUAGE BASED NAME ---------- */

  const name =
    i18n.language === "ar"
      ? attributes.nameAr
      : i18n.language === "ku"
        ? attributes.nameKu
        : attributes.nameEn;

  const price = attributes.price;
  const rating = Math.round(parseFloat(attributes.averageRating));
  const ratingCount = attributes.ratingCount;
  const isNew = attributes.isNew;

  /* ---------- LOGIN CHECK ---------- */

  function handleAddToCart() {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    console.log("Add to cart:", product.id);
  }

  function handleFavorite() {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    setIsFavorite((prev) => !prev);
  }

  /* ---------- STAR RENDERING ---------- */
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<img key={i} src={i <= rating ? FullStar : EmptyStar} />);
  }

  return (
    <div className="flex flex-col gap-5 m-5">
      <CartItem
        img={imgProduct}
        className="w-95.75 h-95.75"
        isNew={isNew}
        onAddToCart={handleAddToCart}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
      />

      <div className="flex flex-col gap-2">
        {/* PRODUCT NAME */}
        <p className="text-[16px] text-[rgb(var(--color-text-main))]  font-medium">
          {name}
        </p>

        {/* PRICE */}
        <div className="flex gap-2">
          <span className="text-[rgb(var(--color-primary-main))] text-[16px] font-medium">
            ${price}
          </span>
          {/* RATING */}
          <div className="flex flex-row gap-0.5 items-center">
            {stars}

            <span className="text-[14px] mx-2 font-semibold text-[rgb(var(--color-text-main-1))] ">
              ({ratingCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemSummary;
