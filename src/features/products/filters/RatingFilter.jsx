import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductFilters } from "../useProductFilters";
import { useLanguage } from "../../../context/LanguageContext";

import SortingUp from "../../../assets/icons/sorting-up.svg";
import SortingDown from "../../../assets/icons/sorting-down.svg";

export default function RatingFilter() {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const { filters, updateFilters } = useProductFilters();
  const ratingSort = filters.ratingSort;

  const handleSelect = (value) => {
    const newSort = ratingSort === value ? null : value;
    updateFilters({ ratingSort: newSort });
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2" ref={wrapperRef}>
      <div className="relative">
        <button
          className={`flex justify-center items-center gap-2 rounded text-sm md:text-base font-normal w-30 h-8 md:w-39.5 md:h-10 transition-colors
            ${
              ratingSort
                ? "bg-[rgb(var(--color-primary-main))] text-white"
                : "bg-[#F5F5F5] text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-1))]"
            }`}
          onClick={() => setOpen(!open)}
        >
          {t("products.rate")}
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <div
            className={`absolute top-full mt-2 ${dir === "rtl" ? "right-0" : "left-0"} z-50 bg-white border border-[rgb(var(--color-primary-1))] rounded-lg shadow-lg overflow-hidden w-46`}
          >
            <div className="border-b border-[rgb(var(--color-border))]">
              <button
                onClick={() => handleSelect("high")}
                className={`flex justify-center items-center gap-2 px-8 py-4 text-[12px] font-normal w-46 h-10 transition-colors
                  ${
                    ratingSort === "high"
                      ? "bg-[rgb(var(--color-primary-main))] text-white"
                      : "bg-white text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-1))]"
                  }`}
              >
                {t("products.high")}
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
                {t("products.low")}
                <img src={SortingUp} className="w-5.5 h-5.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
