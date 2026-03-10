import { useState } from "react";
import CartItem from "./CartItem";
import FullStar from "../../assets/icons/filled-star-Icon.svg";
import EmptyStar from "../../assets/icons/empty-star.svg";
import { isLoggedIn } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgProduct from "../../assets/img/Cart.png";

function CartItemSummary({ product, className }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(product);
  const attributes = product.attributes;

  /* ---------- LANGUAGE BASED NAME ---------- */

  const name =
    i18n.language === "ar"
      ? attributes.nameAr
      : i18n.language === "ku"
        ? attributes.nameKu
        : attributes.nameEn;

  const rating = Math.round(parseFloat(attributes.averageRating));
  const ratingCount = attributes.ratingCount;
  const isNew = attributes.isNew;
  const price = attributes.price;
  const colors = attributes.colors || [];

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
        className={className}
        isNew={isNew}
        onAddToCart={handleAddToCart}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
      />

      <div className="flex flex-col md:gap-2">
        {/* PRODUCT NAME */}
        <p className="text-sm md:text-[16px] text-[rgb(var(--color-text-main))] font-medium">
          {name}
        </p>

        {/* PRICE */}
        <div className="flex gap-2 flex-col">
          <span className="text-[rgb(var(--color-primary-main))] text-sm md:text-[16px] font-medium">
            ${price}
          </span>
          {/* RATING */}
          <div className="flex flex-row gap-0.5 items-center w-3 h-3">
            {stars}

            <span className="text-[14px] mx-2 font-semibold text-[rgb(var(--color-text-main-1))] ">
              ({ratingCount})
            </span>
          </div>
        </div>
        {/* COLORS */}
        {colors.length > 0 && (
          <div className="flex gap-2 mt-1">
            {colors.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItemSummary;
