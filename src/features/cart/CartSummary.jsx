/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

import CartItem from "./CartItem";
import AuthModal from "../auth/AuthModal";

import FullStar from "../../assets/icons/filled-star.svg";
import EmptyStar from "../../assets/icons/empty-star.svg";

import { postWishlist } from "../wishlist/wishlistAPI";

function CartSummary({ product, className, icon }) {
  const { t, i18n } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState("");
  const { loggedIn } = useAuth();
  const attributes = product.attributes;
  const name =
    i18n.language === "ar"
      ? attributes.nameAr
      : i18n.language === "ku"
        ? attributes.nameKu
        : attributes.nameEn;

  const rating = Math.round(parseFloat(attributes.averageRating));
  const ratingCount = attributes.ratingCount;
  const isNew = attributes.isNew;
  const price = Number(attributes.effectivePrice);
  const hasDiscount = attributes.hasDiscount;
  const discountPercentage = attributes.discountPercentage;
  const newPrice = attributes.originalPrice
    ? Number(attributes.originalPrice)
    : null;
  const colors = attributes.colors || [];
  const image = attributes.primaryImage;

  function openAuthModal(action) {
    setAuthAction(action);
    setShowAuthModal(true);
  }

  function handleAddToCart() {
    if (!loggedIn) {
      openAuthModal("cart");
      return;
    }

    console.log("Add to cart:", product.id);
  }

  async function handleFavorite() {
  if (!loggedIn) {
    openAuthModal("favorite");
    return;
  }

  try {
    const res = await postWishlist(product.id);
    console.log(res);
    setIsFavorite((prev) => !prev);
  } catch (error) {
    console.error("Failed to update wishlist:", error.response?.data || error.message);
  }
}

  // async function handleOnFavorite(id){
  //   const res = await postWishlist(id)
  //   console.log(res)
  // }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <img key={i} src={i <= rating ? FullStar : EmptyStar} alt="star" />,
    );
  }

  const modalTitle =
    authAction === "favorite" ? t("products.save") : t("products.ready");

  const modalMessage =
    authAction === "favorite"
      ? t("products.saveToFav")
      : t("products.saveToCart");

  return (
    <>
      <div className="flex flex-col gap-5 m-5">
        <CartItem
          img={image}
          className={className}
          isNew={isNew}
          onAddToCart={handleAddToCart}
          onFavorite={handleFavorite}
          isFavorite={isFavorite}
          icon={icon}
        />

        <div className="flex flex-col md:gap-2">
          <p className="text-sm md:text-[16px] text-[rgb(var(--color-text-main))] font-medium">
            {name}
          </p>

          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-[rgb(var(--color-primary-main))] text-sm md:text-[16px] font-medium">
                ${price.toFixed(2)}
              </span>

              {hasDiscount && newPrice && (
                <span className="text-[rgb(var(--color-text-main-1))] text-sm md:text-[16px] font-medium line-through">
                  ${hasDiscount && newPrice ? newPrice.toFixed(2) : ""}
                </span>
              )}

              {hasDiscount && discountPercentage > 0 && (
                <span className="text-xs md:text-sm font-semibold rounded p-0.5 text-white bg-[rgb(var(--color-primary-main))]">
                  -{discountPercentage}%
                </span>
              )}
            </div>

            <div className="flex flex-row gap-0.5 items-center w-3 h-3">
              {stars}
              <span className="text-[14px] mx-2 font-semibold text-[rgb(var(--color-text-main-1))]">
                ({ratingCount})
              </span>
            </div>
          </div>

          {colors.length > 0 && (
            <div className="flex gap-2 mt-1">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
}

export default CartSummary;
