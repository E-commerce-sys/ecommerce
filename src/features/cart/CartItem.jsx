/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import heart from "../../assets/icons/heart.svg";
import filledHeart from "../../assets/icons/heart-filled.svg";

function CartItem({
  img,
  className = "",
  isNew,
  onAddToCart,
  onFavorite,
  isFavorite,
  icon = isFavorite ? filledHeart : heart,
  id,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`
        relative w-full aspect-square bg-[rgb(var(--color-grey))] group overflow-hidden rounded-lg ${className}
      `}
    >
      {isNew && (
        <span className="absolute top-1 left-1 md:top-3 md:left-3 bg-[rgb(var(--color-discount))] text-white text-[10px] md:text-xs px-2 py-1 rounded">
          {t("new")}
        </span>
      )}

      <img
        src={img}
        alt="product"
        className="w-full h-full p-2 md:p-5 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      <button
        type="button"
        className="absolute top-1 right-1 md:top-3 md:right-3 w-5 h-5 md:w-8.5 md:h-8.5 bg-white p-1 rounded-full shadow-md cursor-pointer"
        onClick={onFavorite}
      >
        <img src={icon} alt="favorite" className="w-full h-full" />
      </button>

      <Link to={`/products/${id}`} target="_blank">
        <button
          type="button"
          onClick={onAddToCart}
          className="
          absolute bottom-0 left-0 w-full
          bg-[rgb(var(--color-bg-dark))] text-white
          py-1 md:py-2 lg:py-4 text-[10px] md:text-sm font-medium
          lg:opacity-0 lg:translate-y-5
          lg:group-hover:opacity-100
          lg:group-hover:translate-y-0
          transition-all duration-300
          cursor-pointer
        "
        >
          {t("detail")}
        </button>
      </Link>
    </div>
  );
}

export default CartItem;
