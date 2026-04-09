import axiosInstance from "../../axios/axiosInstance";
import { loadCategoryTree } from "../categories/loadCategoryTree";
import { buildProductsQueryParams } from "./filters/filtersAPI";

function parseProductListSearchParams(url) {
  const sp = url.searchParams;
  return {
    page: sp.get("page") || 1,
    search: sp.get("search") || "",
    isDiscounted: sp.get("hasDiscount") === "true",
    minPrice: Number(sp.get("minPrice")),
    maxPrice: Number(sp.get("maxPrice")),
    ratingSort: sp.get("ratingSort") || null,
    isBestSelling: sp.get("bestSelling") === "true",
    priceSort: sp.get("priceSort") || null,
    discount: sp.get("discount") ? Number(sp.get("discount")) : null,
    category: sp.get("category") || "",
  };
}

export async function productsLoader({ request }) {
  const url = new URL(request.url);
  const params = buildProductsQueryParams(parseProductListSearchParams(url));

  const [{ categories }, productsRes] = await Promise.all([
    loadCategoryTree(),
    axiosInstance.get("/api/search", { params }),
  ]);

  return {
    categories,
    products: productsRes.data.data,
    totalPages: productsRes.data.meta.last_page,
    search: url.searchParams.get("search") || "",
  };
}
