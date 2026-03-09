import { useState } from 'react';

function ProductFilters() {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), max - 100);
    setMin(value);
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), min + 100);
    setMax(value);
  };

  const minPercent = (min / 5000) * 100;
  const maxPercent = (max / 5000) * 100;

  const minZ = min > 4500 ? 5 : max - min < 500 ? 5 : 4;
  const maxZ = min > 4500 ? 4 : max - min < 500 ? 4 : 5;

  const thumbClasses = `
    absolute w-full h-1 appearance-none bg-transparent cursor-pointer pointer-events-none
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-3
    [&::-webkit-slider-thumb]:h-3
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[rgb(var(--color-primary-main))]
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:border-2
    [&::-webkit-slider-thumb]:border-white
    [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgb(var(--color-primary-main))]
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:hover:bg-[rgb(var(--color-primary-5))]
    [&::-webkit-slider-thumb]:transition-colors
  `;

  return (
    <div className="relative inline-block">
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 bg-white border border-[rgb(var(--color-primary-1))] rounded-lg shadow-lg p-4 w-64 z-50">
          
          {/* Price display */}
          <div className="flex justify-between text-sm mb-4">
            <span className="px-2 py-0.5 rounded font-medium">
              ${min}
            </span>
            <span className="px-2 py-0.5 rounded font-medium">
              ${max}
            </span>
          </div>

          {/* Slider track */}
          <div className="relative h-1 mb-6">
             <div className="absolute w-full h-1 bg-[rgb(var(--color-border))] rounded" />
              <div
              className="absolute h-1 bg-[rgb(var(--color-primary-main))] rounded"
              style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
              />
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={min}
              onChange={handleMin}
              className={thumbClasses}
              style={{ zIndex: minZ }}
            />
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={max}
              onChange={handleMax}
              className={thumbClasses}
              style={{ zIndex: maxZ }}
            />
          </div>

          {/* Min/Max labels */}
          <div className="flex justify-between text-xs text-[rgb(var(--color-text-main-5))] font-medium mb-4">
            <span>$0</span>
            <span>$5000</span>
          </div>

          {/* Apply button */}
          <button
            className="w-full py-2 rounded bg-[rgb(var(--color-primary-main))] text-white text-sm font-medium 
            hover:bg-[rgb(var(--color-primary-5))] active:bg-[rgb(var(--color-primary-6))] transition-colors"
            onClick={() => setOpen(false)}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductFilters;