import { useState, useRef, useEffect } from "react";
import { useProductFilters } from "../useProductFilters";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/LanguageContext";

function PriceFilters() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const { updateFilters, filters } = useProductFilters();

  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(filters.minPrice || "");
  const [max, setMax] = useState(filters.maxPrice || "");
  const [priceSort, setPriceSort] = useState(filters.priceSort); // init from URL
  const [error, setError] = useState("");
  const wrapperRef = useRef(null);

  const isActive =
    !!filters.priceSort && !!filters.minPrice && !!filters.maxPrice;

  function handleClick(sortPrice) {
    setPriceSort((prev) => (prev === sortPrice ? null : sortPrice)); // local only, no updateFilters
  }

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
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        className={`flex justify-center items-center gap-2 rounded text-sm md:text-base bg-[#F5F5F5] font-normal w-30 h-8 md:w-39.5 md:h-10 hover:bg-[rgb(var(--color-primary-1))] transition-colors
          ${
            isActive
              ? "bg-[rgb(var(--color-primary-main))] text-white"
              : "bg-[#F5F5F5] text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-1))]"
          }`}
        onClick={() => setOpen(!open)}
      >
        {t("products.price")}
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
          className={`absolute top-full mt-2 ${dir === "rtl" ? "right-0" : "left-0"} bg-white border border-[rgb(var(--color-primary-1))] rounded-lg shadow-lg p-4 w-64 z-50`}
        >
          {/* inputs */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder={t("products.min")}
              min={0}
              value={min}
              onChange={(e) => {
                let value = e.target.value === "" ? "" : Number(e.target.value);
                if (value < 0) {
                  setError("Negative values are not allowed");
                  return;
                }
                setMin(value);
                if (max && value >= max)
                  setError("Max should be bigger than Min");
                else setError("");
              }}
              className="w-1/2 px-2 py-1 border border-[rgb(var(--color-border))] rounded text-sm"
            />
            <input
              type="number"
              placeholder={t("products.max")}
              min={0}
              value={max}
              onChange={(e) => {
                let value = e.target.value === "" ? "" : Number(e.target.value);
                if (value < 0) {
                  setError("Negative values are not allowed");
                  return;
                }
                setMax(value);
                if (value <= min) setError("Max should be bigger than Min");
                else setError("");
              }}
              className="w-1/2 px-2 py-1 border border-[rgb(var(--color-border))] rounded text-sm"
            />
          </div>

          {error && (
            <p className="text-red-600 text-xs mb-2 font-medium">{error}</p>
          )}

          {/* price sorting */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={() => handleClick("low")}
              className={`px-3 py-2 rounded text-sm border transition cursor-pointer hover:border-[rgb(var(--color-primary-main))]
                ${
                  priceSort === "low"
                    ? "border-2 border-[rgb(var(--color-primary-main))]"
                    : "border-[rgb(var(--color-border))]"
                }`}
            >
              {t("products.low")}
            </button>
            <button
              onClick={() => handleClick("high")}
              className={`px-3 py-2 rounded text-sm border transition cursor-pointer hover:border-[rgb(var(--color-primary-main))]
                ${
                  priceSort === "high"
                    ? "border-2 border-[rgb(var(--color-primary-main))]"
                    : "border-[rgb(var(--color-border))]"
                }`}
            >
              {t("products.high")}
            </button>
          </div>

          {/* apply */}
          <button
            disabled={!!error}
            className={`w-full py-2 rounded text-white text-sm font-medium transition-colors
              ${
                error
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[rgb(var(--color-primary-main))] hover:bg-[rgb(var(--color-primary-5))]"
              }`}
            onClick={() => {
              if (error) return;
              updateFilters({
                minPrice: min || null,
                maxPrice: max || null,
                priceSort,
                page: 1,
              });
              setOpen(false);
            }}
          >
            {t("products.apply")}
          </button>
        </div>
      )}
    </div>
  );
}

export default PriceFilters;
