import heart from "../../assets/icons/heart-Icon.svg";
import filledHeart from "../../assets/icons/heart-filled-Icon.svg";

function CartItem({
  img,
  className = "",
  isNew,
  onAddToCart,
  onFavorite,
  isFavorite,
}) {
  return (
    <div
      className={`
        bg-[rgb(var(--color-grey))] 
        relative 
        group 
        overflow-hidden 
        rounded-lg
        ${className}
      `}
    >
      {/* NEW Badge */}
      {isNew && (
        <span className="absolute top-3 left-3 bg-[rgb(var(--color-discount))] text-white text-xs px-2 py-1 rounded">
          NEW
        </span>
      )}

      {/* Product Image */}
      <img
        src={img}
        className="w-full transition-transform duration-300 py-27.75 px-11.25 group-hover:scale-105"
      />

      {/* Favorite */}
      <button
        className="absolute top-3 right-3 w-8.5 h-8.5 bg-white p-1 rounded-full shadow-md"
        onClick={onFavorite}
      >
        <img
          src={isFavorite ? filledHeart : heart}
          className="cursor-pointer"
        />
      </button>

      {/* Add to Cart */}
      <button
        onClick={onAddToCart}
        className="
          absolute bottom-0 left-0 w-full
          bg-[rgb(var(--color-bg-dark))] text-white
          py-3 lg:py-4 text-sm font-medium
          opacity-0 translate-y-5
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all duration-300
          cursor-pointer
        "
      >
        Add to Cart
      </button>
    </div>
  );
}

export default CartItem;
