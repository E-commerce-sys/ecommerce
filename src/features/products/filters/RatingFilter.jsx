import { useState, useRef, useEffect } from "react";
import SortingUp from "../../../assets/icons/sorting-up-Icon.svg";
import SortingDown from "../../../assets/icons/sorting-down-Icon.svg";
import { useProductFilters } from "../useProductFilters";

export default function RatingFilter() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const { filters, updateFilters } = useProductFilters();
  const ratingSort = filters.rating;

  const handleSelect = (value) => {
    updateFilters({
      rating: value,
    });
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-2" ref={wrapperRef}>
      <div className="relative">
        <button
          className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[16px] font-normal w-39.5 h-10 transition-colors
            ${
              ratingSort
                ? "bg-[rgb(var(--color-primary-main))] text-white"
                : "bg-[#F5F5F5] text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-1))]"
            }`}
          onClick={() => {
            if (ratingSort) {
              updateFilters({ rating: null });
            } else {
              setOpen(!open);
            }
          }}
        >
          Rating
        </button>

        {open && (
          <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-[rgb(var(--color-primary-1))] rounded-lg shadow-lg overflow-hidden w-46">
            <div className="border-b border-[rgb(var(--color-border))] ">
              <button
                onClick={() => handleSelect("high")}
                className={`flex justify-center items-center gap-2 px-8 py-4 text-[12px] font-normal w-46 h-10 transition-colors
                ${
                  ratingSort === "high"
                    ? "bg-[rgb(var(--color-primary-main))] text-white"
                    : "bg-white text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-1))]"
                }`}
              >
                Sort High to Low
                <img src={SortingDown} className="w-5.5 h-5.5" />
              </button>
            </div>

            <div>
              <button
                onClick={() => handleSelect("low")}
                className={`flex justify-center items-center gap-2 px-8 py-4 text-[12px] font-normal w-46 h-10 transition-colors
                ${
                  ratingSort === "low"
                    ? "bg-[rgb(var(--color-primary-main))] text-white"
                    : "bg-white text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-1))]"
                }`}
              >
                Sort Low to High
                <img src={SortingUp} className="w-5.5 h-5.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
