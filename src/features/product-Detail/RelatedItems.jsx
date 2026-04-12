import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CartSummary from "../cart/CartSummary";
import { getSimilarProducts, categoryAPI } from "./relateditemsAPI";
import { useParams } from "react-router-dom";

function RelatedItems() {
  const { productId } = useParams();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilar() {
      try {
        const categoryId = await categoryAPI(productId);
        const similar = await getSimilarProducts(categoryId);
        setProducts(similar.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSimilar();
  }, [productId]);
  return (
    <section className="mx-auto mb-20 flex w-full min-w-0 max-w-[1240px] flex-col items-start gap-10 px-5 md:px-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
          <span className="text-[20px] font-semibold">
            {t("wishlist.justForYou")}
          </span>
        </div>
      </div>

      {/* Products — same grid/card sizing as home BestProducts / FeaturedProducts */}
      <div className="grid w-full min-w-0 max-w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square min-h-48 animate-pulse rounded-lg bg-gray-100"
              />
            ))
          : products.map((p) => {
              const product = {
                id: p.id,
                attributes: {
                  nameEn: p.attributes.nameEn,
                  nameAr: p.attributes.nameAr,
                  nameKu: p.attributes.nameKu,
                  averageRating: p.attributes.averageRating,
                  ratingCount: p.attributes.ratingCount,
                  isNew: p.attributes.isNew,
                  effectivePrice: Number(p.attributes.effectivePrice),
                  originalPrice: Number(p.attributes.originalPrice),
                  hasDiscount: p.attributes.hasDiscount,
                  discountPercentage: p.attributes.discountPercentage,
                  primaryImage: p.attributes.primaryImage,
                  isInWishList: p.attributes.isInWishList ?? false,
                },
              };
              return (
                <div key={product.id} className="min-w-0">
                  <CartSummary
                    product={product}
                    wrapperClassName="flex w-full min-w-0 flex-col gap-3 m-0"
                    className="aspect-square w-full min-w-0"
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
}

export default RelatedItems;
