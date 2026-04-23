/** Global row index for paginated tables (uses API meta.from when present). */
export function tableRowDisplayNumber(meta, index) {
  const from = meta?.from;
  if (from != null && !Number.isNaN(Number(from))) {
    return Number(from) + index;
  }
  const perPage = Number(meta?.per_page ?? 10);
  const page = Number(meta?.current_page ?? 1);
  if (
    Number.isNaN(perPage) ||
    Number.isNaN(page) ||
    perPage < 1 ||
    page < 1
  ) {
    return index + 1;
  }
  return (page - 1) * perPage + index + 1;
}
