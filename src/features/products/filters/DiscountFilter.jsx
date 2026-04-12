import { useTranslation } from "react-i18next";
import { useProductFilters } from "../useProductFilters";

export default function DiscountFilter() {
  const { filters, updateFilters } = useProductFilters();
  const hasDiscount = filters.hasDiscount;
  const { t } = useTranslation();

  function handleDiscount() {
    updateFilters({
      hasDiscount: !hasDiscount,
    });
  }

  return (
    <button
      className={`flex justify-center items-center gap-2 rounded text-sm md:text-base font-normal w-30 h-8 md:w-39.5 md:h-10 transition-colors
        ${
          hasDiscount
            ? "bg-[rgb(var(--color-primary-main))] text-white"
            : "bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]"
        }`}
      onClick={handleDiscount}
    >
      {t("products.discount")}
    </button>
  );
}
