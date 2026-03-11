import DiscountFilter from "./DiscountFilter";
import RatingFilter from "./RatingFilter";
import PriceFilters from "./PriceFilter";

export default function Filters() {
  return (
    <div className="flex flex-col gap-4 mt-7 px-4 md:px-10">
      <h1 className="font-semibold text-[24px]">Filter</h1>
      <div className="flex flex-wrap gap-3 items-center">
        <PriceFilters />
        <DiscountFilter />
        <RatingFilter />
      </div>
    </div>
  );
}