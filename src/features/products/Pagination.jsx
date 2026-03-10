import { useState } from "react";

export default function Pagination({ totalPages = 5 }) {    //The total pages are determined by the product array
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrent(page)}
          className={`w-8 h-8 rounded text-[14px] font-medium transition-colors
            ${current === page
              ? "bg-[rgb(var(--color-primary-main))] text-white"
              : "bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]"
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}