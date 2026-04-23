import axiosInstance from "../../../../axios/axiosInterceptor";
import { getCategories } from "../../categories/api/getCategories";

export async function getAdminProducts({ request }) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";
    const tag = url.searchParams.get("tag") || "";

    const params = { page };
    if (search.trim()) params["filter[nameEnContains]"] = search.trim();
    if (category && category !== "all") params["filter[category]"] = category;
    if (tag && tag !== "all") params[`filter[${tag}]`] = true;

    const [productsRes, categoriesRes] = await Promise.all([
      axiosInstance.get("/api/products?include=category", { params }),
      getCategories(),
    ]);

    return {
      products: productsRes.data,
      categories: categoriesRes,
    };
  } catch (error) {
    console.error("Error fetching admin products:", error);
    throw error;
  }
}
