/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useProductFilters } from "./useProductFilters";
import { useProductContext } from "./ProductContext";

export default function Pagination() {
  const { totalPages } = useProductContext();
  const { filters, updateFilters } = useProductFilters();

  const lastPage = Math.max(1, Number(totalPages) || 1);
  const current = Math.min(Math.max(Number(filters.page) || 1, 1), lastPage);

  const setPage = (page) => {
    updateFilters({ page });
  };

  const getPages = () => {
    const rawPages = (() => {
      if (lastPage <= 5) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
      }

      if (current <= 4) return [1, 2, 3, 4, 5, "...", lastPage];

      if (current >= lastPage - 3) {
        return [
          1,
          "...",
          lastPage - 4,
          lastPage - 3,
          lastPage - 2,
          lastPage - 1,
          lastPage,
        ];
      }

      return [1, "...", current - 1, current, current + 1, "...", lastPage];
    })();

    // Defensive normalization: remove out-of-range and duplicate numbers.
    const seen = new Set();
    const normalized = [];
    for (const token of rawPages) {
      if (token === "...") {
        if (normalized[normalized.length - 1] !== "...") normalized.push(token);
        continue;
      }
      if (token < 1 || token > lastPage) continue;
      if (seen.has(token)) continue;
      seen.add(token);
      normalized.push(token);
    }
    if (normalized[normalized.length - 1] === "...") normalized.pop();
    return normalized;
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
            key={`${page}-${index}`}
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
