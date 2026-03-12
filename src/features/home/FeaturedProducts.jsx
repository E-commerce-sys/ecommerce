/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useMemo } from "react";
import CartItemSummary from "../cart/CartSummary";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FeaturedProducts({ data }) {
  // randomly pick 8 products
  const { t } = useTranslation();
  const products = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [data]);

  return (
    <section className="flex justify-center py-12">
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Header */}
        <div className="flex justify-between mx-5 md:mx-10 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                {t("feasturedProduct.products")}
              </span>
            </div>

            <p className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              {t("feasturedProduct.explore")}
            </p>
          </div>

          <Link to="/products">
            <Button variant="outline" size="sm">
              {t("view")}
            </Button>
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 px-5">
          {products.map((product) => (
            <CartItemSummary
              key={product.id}
              product={product}
              className="w-full aspect-square lg:w-67.5 lg:h-67.5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
