import { useState, useRef, useEffect } from "react";
import { useProductFilters } from "../useProductFilters";

function PriceFilters() {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const [priceSort, setPriceSort] = useState(null);

  const wrapperRef = useRef(null);
  const { updateFilters } = useProductFilters();

  const [error, setError] = useState("");

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
        className="flex justify-center items-center gap-2 px-8 py-4 rounded text-[16px] bg-[#F5F5F5] font-normal w-39.5 h-10 hover:bg-[rgb(var(--color-primary-1))] transition-colors"
        onClick={() => setOpen(!open)}
      >
        Price
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
        <div className="absolute top-full mt-2 left-0 bg-white border border-[rgb(var(--color-primary-1))] rounded-lg shadow-lg p-4 w-64 z-50">
          {/* inputs */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              min={0}
              onChange={(e) => {
                let value = Number(e.target.value);

                if (value < 0) {
                  setError("Negative values are not allowed");
                  return;
                }

                setMin(value);

                if (max && value >= max) {
                  setError("Max should be bigger than Min");
                } else {
                  setError("");
                }
              }}
              className="w-1/2 px-2 py-1 border rounded text-sm"
            />

            <input
              type="number"
              placeholder="Max"
              min={0}
              onChange={(e) => {
                let value = Number(e.target.value);

                if (value < 0) {
                  setError("Negative values are not allowed");
                  return;
                }

                setMax(value);

                if (value <= min) {
                  setError("Max should be bigger than Min");
                } else {
                  setError("");
                }
              }}
              className="w-1/2 px-2 py-1 border rounded text-sm"
            />
          </div>
          {error && (
            <p className="text-red-600 text-xs mb-2 font-medium">{error}</p>
          )}{" "}
          {/* price sorting */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={() => setPriceSort("low")}
              className={`px-3 py-2 rounded text-sm border transition
              ${
                priceSort === "low"
                  ? "border-2 border-[rgb(var(--color-primary-main))]"
                  : "hover:bg-[rgb(var(--color-primary-1))]"
              }`}
            >
              Sort Low → High
            </button>

            <button
              onClick={() => setPriceSort("high")}
              className={`px-3 py-2 rounded text-sm border transition
              ${
                priceSort === "high"
                  ? "border-2 border-[rgb(var(--color-primary-main))]"
                  : "hover:bg-[rgb(var(--color-primary-1))]"
              }`}
            >
              Sort High → Low
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
                minPrice: min,
                maxPrice: max,
                priceSort,
                page: 1,
              });

              setOpen(false);
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default PriceFilters;
