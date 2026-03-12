import { useState, useRef, useEffect } from "react";
import SortingUp from '../../../assets/icons/sorting-up-Icon.svg';
import SortingDown from '../../../assets/icons/sorting-down-Icon.svg';
import { useProductContext } from "../ProductContext";

export default function RatingFilter() {
  const [open, setOpen] = useState(false);
  const { ratingSort, setRatingSort, setPage } = useProductContext();
  const wrapperRef = useRef(null);

  const handleSelect = (value) => {
    setRatingSort(value);
    setPage(1);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2" ref={wrapperRef}>
      <div className="relative">
        <button
          className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[16px] font-normal w-39.5 h-10 transition-colors
            ${ratingSort
              ? 'bg-[rgb(var(--color-primary-main))] text-white'
              : 'bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]'
            }`}
          onClick={() => {
            if (ratingSort) {
              setRatingSort(null);
              setPage(1);
            } else {
              setOpen(!open);
            }
          }}
        >
          Rating
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-[rgb(var(--color-primary-1))] rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => handleSelect('high')}
              className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[12px] font-normal w-44 h-10 transition-colors border-b border-[rgb(var(--color-primary-1))] whitespace-nowrap
                ${ratingSort === 'high'
                  ? 'bg-[rgb(var(--color-primary-main))] text-white'
                  : 'bg-white text-black hover:bg-[rgb(var(--color-primary-1))]'
                }`}
            >
              Sort High to Low
              <img src={SortingDown} className="w-[22px] h-[22px]" />
            </button>
            <button
              onClick={() => handleSelect('low')}
              className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[12px] font-normal w-44 h-10 transition-colors whitespace-nowrap
                ${ratingSort === 'low'
                  ? 'bg-[rgb(var(--color-primary-main))] text-white'
                  : 'bg-white text-black hover:bg-[rgb(var(--color-primary-1))]'
                }`}
            >
              Sort Low to High
              <img src={SortingUp} className="w-[22px] h-[22px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}