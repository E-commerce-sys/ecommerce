import { useSearchParams } from "react-router-dom";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    page: Number(searchParams.get("page") || 1),

    search: searchParams.get("search") || "",

    bestSelling: searchParams.get("bestSelling") === "true",
    hasDiscount: searchParams.get("hasDiscount") === "true",
    discount: Number(searchParams.get("discount") || 0),
    minPrice: Number(searchParams.get("minPrice") || 0),
    maxPrice: Number(searchParams.get("maxPrice") || 5000),

    category: searchParams.get("category") || "",
    subcategory: searchParams.get("subcategory") || "",

    ratingSort: searchParams.get("ratingSort") || null,
    priceSort: searchParams.get("priceSort") || null,
  };

  function updateFilters(updates) {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === false
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    if (!("page" in updates)) {
      params.set("page", "1");
    }

    setSearchParams(params);
  }

  return { filters, updateFilters };
}
