import { useProductContext } from "../ProductContext";
import { useProductFilters } from "../useProductFilters";
import { useTranslation } from "react-i18next";

import DiscountFilter from "./DiscountFilter";
import RatingFilter from "./RatingFilter";
import PriceFilters from "./PriceFilter";

import Arrow from "../../../assets/icons/arrow-left.svg";

export default function Filters() {
  const { filters, updateFilters } = useProductFilters();
  const page = filters.page;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ku";
  const { totalPages } = useProductContext();

  return (
    <div className="flex flex-col gap-4 mt-7 px-4 md:px-10">
      <h1 className="font-semibold text-[24px]">{t("products.filter")}</h1>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <PriceFilters />
          <DiscountFilter />
          <RatingFilter />
        </div>
        <div className="hidden lg:flex items-center gap-4 mx-5">
          <button
            onClick={() => updateFilters({ page: Math.max(page - 1, 1) })}
            className="flex items-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={page === 1}
          >
            <img
              src={Arrow}
              className={`w-7 h-7 rounded-full transition-colors active:bg-[rgb(var(--color-text-main-1))] 
      ${isRTL ? "rotate-180" : ""} 
      ${page !== 1 ? "hover:bg-[rgb(var(--color-border))]" : ""}`}
            />

            <span className="px-2">{t("products.prev")}</span>
          </button>

          <button
            onClick={() =>
              updateFilters({ page: Math.min(page + 1, totalPages) })
            }
            className="flex items-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={page === totalPages}
          >
            <span className="px-2">{t("products.next")}</span>

            <img
              src={Arrow}
              className={`w-7 h-7 rounded-full transition-colors active:bg-[rgb(var(--color-text-main-1))] 
      ${!isRTL ? "scale-x-[-1]" : ""} 
      ${page !== totalPages ? "hover:bg-[rgb(var(--color-border))]" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
