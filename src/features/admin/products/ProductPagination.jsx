export default function Pagination({ meta, onPageChange }) {
  if (!meta?.links?.length) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {meta.links.map((link, index) => {
        const label = link.label
          .replace("&laquo; Previous", "Prev")
          .replace("Next &raquo;", "Next");

        const isActive = link.active;

        if (!link.url) {
          return (
            <span
              key={index}
              className="w-8 h-8 flex items-center justify-center text-sm opacity-40"
            >
              {label}
            </span>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange(link.page)}
            className={`w-8 h-8 rounded text-sm transition
              ${
                isActive
                  ? "bg-[rgb(var(--color-primary-main))] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}