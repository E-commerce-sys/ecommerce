import axiosInstance from "../../axios/axiosInstance";
import { categoriesAPI } from "../categories/categoriesAPI";

export async function productsLoader({ request }) {
  const url = new URL(request.url);

  const page = url.searchParams.get("page") || 1;
  const search = url.searchParams.get("search") || "";

  const params = { page };

  if (search) {
    params["filter[nameEnContains]"] = search;
  }

  const [categories, productsRes] = await Promise.all([
    categoriesAPI(),
    axiosInstance.get("/api/products", { params }),
  ]);

  return {
    categories,
    products: productsRes.data.data,
    totalPages: productsRes.data.meta.last_page,
    search,
  };
}
