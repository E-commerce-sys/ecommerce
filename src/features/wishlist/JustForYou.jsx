import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CartSummary from "../cart/CartSummary";
import { getSimilarProducts } from "./wishlistAPI";

function JustForYou({ wishlistItems, sharedReady }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sharedReady) return;

    let cancelled = false;

    async function run() {
      try {
        const list = wishlistItems ?? [];
        const similar =
          list.length > 0 ? await getSimilarProducts(list) : [];
        if (!cancelled) setProducts(similar.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [sharedReady, wishlistItems]);

  return (
    <section className="mx-auto flex w-full min-w-0 max-w-[1240px] flex-col gap-10 px-5 md:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-6 w-3 rounded-sm bg-[rgb(var(--color-primary-main))] md:h-7 md:w-4 lg:h-8 lg:w-5" />
          <span className="text-[20px] font-semibold">
            {t("wishlist.justForYou")}
          </span>
        </div>
      </div>

      <div className="grid w-full min-w-0 max-w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
        {loading || !sharedReady
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

export default JustForYou;
