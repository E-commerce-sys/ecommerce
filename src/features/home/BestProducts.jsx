import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CartItemSummary from "../cart/CartSummary";
import Button from "../../components/Button";

function BestProducts({ data }) {
  const { t } = useTranslation();
  const products = useMemo(
    () => [...data].sort((a, b) => Number(a.id) - Number(b.id)).slice(0, 4),
    [data],
  );

  return (
    <section className="flex w-full min-w-0 justify-center overflow-x-hidden py-12">
      <div className="flex w-full min-w-0 max-w-[1240px] flex-col gap-2 px-5 md:gap-8 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                {t("bestProduct.month")}
              </span>
            </div>

            <p className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              {t("bestProduct.best")}
            </p>
          </div>

          <Link to="/search?bestSelling=true">
            <Button variant="outline" size="sm">
              {t("view")}
            </Button>
          </Link>
        </div>

        {/* Products — 4 cols only at xl; lg:w-67.5 + m-5 overflowed ~1024px */}
        <div className="grid w-full min-w-0 max-w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="min-w-0">
              <CartItemSummary
                product={product}
                wrapperClassName="flex w-full min-w-0 flex-col gap-3 m-0"
                className="aspect-square w-full min-w-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestProducts;
