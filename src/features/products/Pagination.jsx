/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useProductFilters } from "./useProductFilters";
import { useProductContext } from "./ProductContext";

export default function Pagination() {
  const { totalPages } = useProductContext();
  const { filters, updateFilters } = useProductFilters();

  const current = Number(filters.page) || 1;

  const setPage = (page) => {
    updateFilters({ page });
  };

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (current <= 4) return [1, 2, 3, 4, 5, "...", totalPages];

    if (current >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [1, "...", current - 1, current, current + 1, "...", totalPages];
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {getPages().map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="w-8 h-8 flex items-center justify-center text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`w-8 h-8 rounded text-[14px] font-medium transition-colors
              ${
                current === page
                  ? "bg-[rgb(var(--color-primary-main))] text-white"
                  : "bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]"
              }`}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}
