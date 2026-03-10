import { useState } from "react";
import SortingUp from '../../../assets/icons/sorting-up-Icon.svg'
import SortingDown from '../../../assets/icons/sorting-down-Icon.svg'

export default function RatingFilter() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null); // 'high' | 'low' | null

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  const handleClear = () => {
    setSelected(null);
  };

  return (
    <div className="flex items-center gap-2 p-2">

      {/* Main button */}
      <div className="relative">
        <button
          className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[16px] font-normal w-39.5 h-10 transition-colors
            ${selected
              ? 'bg-[rgb(var(--color-primary-main))] text-white'
              : 'bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]'
            }`}
          onClick={() => setOpen(!open)}
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
              className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[12px] font-normal w-39.5 h-10 transition-colors
                ${selected === 'high'
                  ? 'bg-[rgb(var(--color-primary-main))] text-white'
                  : 'bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]'
                }`}
            >
              Sort High to Low
              <img src={SortingDown} className="w-[25px] h-[25px]" />
            </button>
            <button
              onClick={() => handleSelect('low')}
              className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[12px] font-normal w-39.5 h-10 transition-colors
                ${selected === 'low'
                  ? 'bg-[rgb(var(--color-primary-main))] text-white'
                  : 'bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]'
                }`}
            >
              Sort Low to High
              <img src={SortingUp} className="w-[25px] h-[25px]" />
            </button>
          </div>
        )}
      </div>

      {/* Active filter tag */}
      {selected && (
        <button
            onClick={handleClear}
            className="flex justify-between items-center px-4 py-2 rounded text-[14px] font-normal w-39.5 h-10 bg-[rgb(var(--color-primary-main))] text-white hover:bg-[rgb(var(--color-primary-5))] transition-colors"
        >
            {selected === 'high' ? 'Sort High to Low' : 'Sort Low to High'}
            <img src={selected === 'high' ? SortingDown : SortingUp} className="w-[25px] h-[25px]" />
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        )}

    </div>
  );
}