/**
 * Stable global row index across pages (does not restart at 1 each page).
 * Uses pagination meta when present (current_page + per_page), then meta.from.
 */
export function tableRowDisplayNumber(meta, index) {
  if (!meta || typeof meta !== "object") return index + 1;

  const perPage = Number(meta.per_page ?? meta.perPage);
  const page = Number(meta.current_page ?? meta.currentPage);

  if (
    Number.isFinite(perPage) &&
    perPage > 0 &&
    Number.isFinite(page) &&
    page >= 1
  ) {
    return (page - 1) * perPage + index + 1;
  }

  const from = meta.from;
  if (from != null && !Number.isNaN(Number(from))) {
    return Number(from) + index;
  }

  return index + 1;
}
