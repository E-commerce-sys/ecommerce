import { useSearchParams } from "react-router-dom";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    page: Number(searchParams.get("page") || 1),
    search: searchParams.get("search") || "",
    bestSelling: searchParams.get("bestSelling") === "true",
    hasDiscount: searchParams.get("hasDiscount") === "true",
    discount: searchParams.get("discount")
      ? Number(searchParams.get("discount"))
      : null,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    category: searchParams.get("category") || "",
    subcategory: searchParams.get("subcategory") || "",
    ratingSort: searchParams.get("ratingSort") || null,
    priceSort: searchParams.get("priceSort") || null,
    firstSort: searchParams.get("firstSort") || null,
  };

  function updateFilters(updates) {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" || value === false) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      if (!("page" in updates)) {
        params.set("page", "1");
      }

      return params;
    });
  }

  return { filters, updateFilters }; // ✅ was missing
}