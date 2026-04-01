/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useParams, useLocation, Link } from "react-router-dom";
import { productAPI } from "../products/productAPI";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FullStar from "../../assets/icons/filled-star.svg";
import EmptyStar from "../../assets/icons/empty-star.svg";
import Button from "../../components/Button";
import heart from "../../assets/icons/heart.svg";
import heartFilled from "../../assets/icons/heart-filled.svg";
import { useAuth } from "../../context/AuthContext";
import {
  postWishlist,
  deleteWishlistItem,
  getWishlist,
} from "../wishlist/wishlistAPI";
import deliveryIcon from "../../assets/icons/delivery.svg";
import returnIcon from "../../assets/icons/return.svg";
import AuthModal from "../auth/AuthModal";
import { addToCart } from "../basket/api/addToCart";

function ProductShowcase() {
  const { loggedIn } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [authAction, setAuthAction] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const from = location.state?.from || "/";

  function openAuthModal(action) {
    setAuthAction(action);
    setShowAuthModal(true);
  }

  //Fetching Product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await productAPI(productId);
        setProduct(data);

        // check if product is in wishlist
        const wishlist = await getWishlist();
        const isInWishlist = wishlist.some(
          (item) => item.included.product.id === Number(productId),
        );
        setIsWishlisted(isInWishlist);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  //Product based const
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const image = product.attributes.primaryImage;
  const name =
    i18n.language === "ar"
      ? product.attributes.nameAr
      : i18n.language === "ku"
        ? product.attributes.nameKu
        : product.attributes.nameEn;
  const rating = Math.round(parseFloat(product.attributes.averageRating));
  const ratingCount = product.attributes.ratingCount;
  const description =
    i18n.language === "ar"
      ? product.attributes.descriptionAr
      : i18n.language === "ku"
        ? product.attributes.descriptionKu
        : product.attributes.descriptionEn;
  const productSizes = product.included?.productSizes ?? [];
  const basePrice = Number(product.attributes.effectivePrice);

  const extraPrice = selectedSize
    ? Number(
        productSizes.find((s) => s.id === selectedSize)?.attributes
          .extraPrice ?? 0,
      )
    : 0;

  const totalPrice = (basePrice + extraPrice).toFixed(2);
  const productColors = product.included?.productColors ?? [];

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <img key={i} src={i <= rating ? FullStar : EmptyStar} alt="star" />,
    );
  }

  //Handling wishlist POST function
  async function handleFavorite(isWishlisted, productId) {
    if (!loggedIn) {
      openAuthModal("favorite");
      return;
    }

    try {
      if (isWishlisted) {
        await deleteWishlistItem(productId);
      } else {
        await postWishlist(productId); // add using product id
      }
      setIsWishlisted((prev) => !prev);
    } catch (error) {
      console.error(
        "Failed to update wishlist:",
        error.response?.data || error.message,
      );
    }
  }

  async function handleAddToCart() {
    if (!loggedIn) {
      openAuthModal("cart");
      return;
    }
    try {
      const res = await addToCart(
        productId,
        selectedSize,
        selectedColor,
        quantity,
      );
      setSuccessMessage(res.message || "Product added to cart successfully!");
      console.log("Add to cart response:", res);
    } catch (error) {
      const apiError =
        error.response?.data?.errors?.[0]?.message || "Failed to add to cart";

      setErrorMessage(apiError);

      console.error("Failed to add to cart:", error.response?.data);
    }
  }
  const modalTitle =
    authAction === "favorite" ? t("products.save") : t("products.ready");

  const modalMessage =
    authAction === "favorite"
      ? t("products.saveToFav")
      : t("products.saveToCart");

  return (
    <>
      <div className="my-[60px] md:my-[100px] lg:my-[150px] px-4 md:px-8 lg:mx-[75px] lg:w-9/10">
        {/* Breadcrumb */}
        <div className="mb-8 md:mb-[100px]">
          <Link to={from} className="text-[rgb(var(--color-text-main-2))]">
            {from === "/"
              ? "Home"
              : from === "/products"
                ? "Products"
                : "Wishlist"}{" "}
            /{" "}
          </Link>
          <span>{name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="flex flex-row flex-wrap gap-4 lg:flex-col lg:flex-nowrap">
              <img
                src={image}
                className="aspect-square w-[calc(50%-0.5rem)] md:w-[164px] md:h-[120px] lg:w-[170px] lg:h-[135px] bg-[rgb(var(--color-grey))] px-[24px] py-[12px] object-contain"
              />
              <img
                src={image}
                className="aspect-square w-[calc(50%-0.5rem)] md:w-[164px] md:h-[120px] lg:w-[170px] lg:h-[135px] bg-[rgb(var(--color-grey))] px-[24px] py-[12px] object-contain"
              />
              <img
                src={image}
                className="aspect-square w-[calc(50%-0.5rem)] md:w-[164px] md:h-[120px] lg:w-[170px] lg:h-[135px] bg-[rgb(var(--color-grey))] px-[24px] py-[12px] object-contain"
              />
              <img
                src={image}
                className="aspect-square w-[calc(50%-0.5rem)] md:w-[164px] md:h-[120px] lg:w-[170px] lg:h-[135px] bg-[rgb(var(--color-grey))] px-[24px] py-[12px] object-contain"
              />
            </div>
            <div className="w-full lg:w-auto">
              <img
                src={image}
                className="w-full lg:w-[500px] h-[300px] md:h-[450px] lg:h-[600px] bg-[rgb(var(--color-grey))] px-[27px] py-[40px] lg:py-[154px] object-contain"
              />
            </div>{" "}
          </div>

          {/* Product Info */}
          <div className="flex flex-col w-full lg:max-w-100 gap-y-2.5">
            <h1 className="text-[20px] md:text-[24px] font-semibold">{name}</h1>

            {/* Rating */}
            <div className="flex gap-1 flex-wrap justify-start items-center">
              {stars}
              <span className="text-[14px] mx-2 font-semibold text-[rgb(var(--color-text-main-1))]">
                ({ratingCount} Reviews)
              </span>
              <span className="text-[14px] text-[rgb(var(--color-text-main-1))]">
                |
              </span>
              <span
                className={`${product.attributes.stockQuantity !== 0 ? "text-[rgb(var(--color-discount))]" : "text-[rgb(var(--color-primary-5))]"} text-[14px] mx-2`}
              >
                {product.attributes.stockQuantity !== 0
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="flex gap-2.5 items-center">
              <span
                className={`text-[20px] md:text-[24px] font-semibold ${product.attributes.hasDiscount ? "text-[rgb(var(--color-primary-main))]" : ""}`}
              >
                ${totalPrice}
              </span>
              {product.attributes.hasDiscount && (
                <span className="text-[20px] md:text-[24px] font-medium line-through text-[rgb(var(--color-text-main-1))]">
                  ${product.attributes.originalPrice}
                </span>
              )}
            </div>

            <p className="text-[14px] pt-[20px]">{description}</p>
            <hr className="my-5" />

            {/* Colors */}
            {productColors.length > 0 && (
              <div className="flex items-center">
                <span className="text-[18px] md:text-[20px]">Colors :</span>
                <div className="flex gap-3 ml-5 flex-wrap">
                  {productColors.map((color) => (
                    <div
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:shadow-md
            ${selectedColor === color.id ? "ring-[1px] ring-gray-900 ring-offset-[1px]" : ""}`}
                    >
                      <span
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color.attributes.hexCode }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {productSizes.length > 0 && (
              <div className="flex items-center flex-wrap gap-y-2">
                <span className="text-[18px] md:text-[20px]">Size :</span>
                <div className="flex gap-4 ml-6 flex-wrap">
                  {productSizes.map((s) => (
                    <Button
                      key={s.id}
                      onClick={() => {
                        setSelectedSize(s.id);
                        setSelectedSize(s.id);
                      }}
                      className={`aspect-square w-8 h-8 ${
                        selectedSize === s.id
                          ? "bg-[rgb(var(--color-primary-main))] text-white hover:bg-[rgb(var(--color-primary-main))]"
                          : "hover:bg-[rgb(var(--color-primary-3))] hover:text-white"
                      }`}
                      variant="outline"
                      size=""
                    >
                      {s.attributes.sizeLabel}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <div className="flex items-center border border-gray-300 rounded w-fit h-[44px] overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-[40px] h-full flex items-center justify-center border-r border-gray-300 hover:bg-[rgb(var(--color-primary-main))] hover:text-white active:bg-[rgb(var(--color-primary-main))] active:text-white text-[24px]"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-[40px] h-full text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-[40px] h-full flex items-center justify-center border-l border-gray-300 hover:bg-[rgb(var(--color-primary-main))] cursor-pointer hover:text-white active:bg-[rgb(var(--color-primary-main))] active:text-white text-[24px]"
                >
                  +
                </button>
              </div>

              <Button
                className="h-11 w-full sm:w-[186px] text-[16px]"
                size=""
                disabled={
                  (productColors.length > 0 && !selectedColor) ||
                  (productSizes.length > 0 && !selectedSize)
                }
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>

              <button
                onClick={() => handleFavorite(isWishlisted, productId)}
                className="h-11 w-11 flex items-center justify-center border border-gray-300 rounded hover:border-[rgb(var(--color-primary-main))]"
              >
                <img
                  src={isWishlisted ? heartFilled : heart}
                  alt="favorite"
                  className="w-6 h-6 aspect-square"
                />
              </button>
            </div>
            <p
              className={`text-sm ${errorMessage ? "text-red-600" : "text-green-600"}`}
            >
              {errorMessage ? errorMessage : successMessage}
            </p>
            {/* Delivery Info */}
            <div className="border border-gray-300 rounded w-full mt-8 lg:mt-12.5">
              <div className="flex items-center gap-4 p-4 border-b border-gray-300">
                <img
                  src={deliveryIcon}
                  alt="delivery"
                  className="w-8 h-8 lg:w-10 lg:h-10 invert"
                />
                <div className="flex flex-col">
                  <span className="font-medium">Free Delivery</span>
                  <span className="text-[12px] text-gray-500 underline cursor-pointer">
                    Enter your postal code for Delivery Availability
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <img
                  src={returnIcon}
                  alt="return"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
                <div className="flex flex-col">
                  <span className="font-medium">Return Delivery</span>
                  <span className="text-[12px] text-gray-500">
                    Free 30 Days Delivery Returns.{" "}
                    <span className="underline cursor-pointer">Details</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title={modalTitle}
        message={modalMessage}
      />{" "}
    </>
  );
}

export default ProductShowcase;
