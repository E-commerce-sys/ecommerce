import DiscountFilter from "./DiscountFilter";
import RatingFilter from "./RatingFilter";
import PriceFilters from "./PriceFilter";
import { useProductContext } from "../ProductContext";
import Arrow from "../../../assets/icons/icons-arrow-left.svg";

export default function Filters() {
  const { page, setPage, totalPages } = useProductContext();
  return (
    <div className="flex flex-col gap-4 mt-7 px-4 md:px-10">
      <h1 className="font-semibold text-[24px]">Filter</h1>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <PriceFilters />
          <DiscountFilter />
          <RatingFilter />
        </div>
        <div className="hidden md:flex items-center gap-4 mx-5">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={page === 1}
          >
            <img
              src={Arrow}
              className={`w-7 h-7 rounded-full transition-colors ${
                page !== 1 ? "hover:bg-[rgb(var(--color-border))]" : ""
              }`}
            />
            <span className="px-2">Prev</span>
          </button>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="flex items-center shrink-0 cursor-pointer  disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={page === totalPages}
          >
            <span className="px-2">Next</span>
            <img
              src={Arrow}
              className={`scale-x-[-1] w-7 h-7 rounded-full transition-colors ${
                page !== totalPages
                  ? "hover:bg-[rgb(var(--color-border))] cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
