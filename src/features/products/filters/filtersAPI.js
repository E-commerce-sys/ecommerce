import axiosInstance from "../../../axios/axiosInstance";
import i18n from "i18next";

/**
 * Shared by `filtersAPI` and `productsLoader` so the route loader and filters
 * use the same query shape.
 */
export function buildProductsQueryParams({
  page = 1,
  search = "",
  isDiscounted = false,
  minPrice,
  maxPrice,
  ratingSort = null,
  isBestSelling = false,
  priceSort = null,
  discount = null,
  category,
} = {}) {
  const params = { page: Number(page) || 1 };

  if (search) {
    const map = {
      en: "nameEnContains",
      ar: "nameArContains",
      ku: "nameKuContains",
    };

    const field = map[i18n.language] || "nameEnContains";

    params[`filter[${field}]`] = search;
  }

  if (discount !== null && discount !== undefined) {
    params["filter[discountPercentage]"] = discount;
  }

  if (isDiscounted) params["filter[hasDiscount]"] = true;

  if (minPrice > 0 || maxPrice) {
    params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;
  }

  const sorts = [];

  if (priceSort === "low") sorts.push("price");
  if (priceSort === "high") sorts.push("-price");

  if (ratingSort === "low") sorts.push("averageRating");
  if (ratingSort === "high") sorts.push("-averageRating");

  if (sorts.length) params.sort = sorts.join(",");

  if (isBestSelling) params["filter[isBestSelling]"] = true;

  if (category) params["filter[category]"] = category;

  return params;
}

export async function filtersAPI(
  page = 1,
  search = "",
  isDiscounted = false,
  minPrice,
  maxPrice,
  ratingSort = null,
  isBestSelling = false,
  priceSort = null,
  discount = null,
  category,
) {
  const params = buildProductsQueryParams({
    page,
    search,
    isDiscounted,
    minPrice,
    maxPrice,
    ratingSort,
    isBestSelling,
    priceSort,
    discount,
    category,
  });

  const res = await axiosInstance.get("/api/products", { params });

  return {
    data: res.data.data,
    meta: res.data.meta,
  };
}
