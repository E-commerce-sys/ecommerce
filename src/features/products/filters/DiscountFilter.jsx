import { useProductFilters } from "../useProductFilters";

export default function DiscountFilter() {
  const { filters, updateFilters } = useProductFilters();
  const hasDiscount = filters.hasDiscount;

  function handleDiscount() {
    updateFilters({
      hasDiscount: !hasDiscount,
    });
  }

  return (
    <button
      className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[16px] font-normal w-39.5 h-10 transition-colors
        ${
          hasDiscount
            ? "bg-[rgb(var(--color-primary-main))] text-white"
            : "bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]"
        }`}
      onClick={handleDiscount}
    >
      Discounts
    </button>
  );
}
