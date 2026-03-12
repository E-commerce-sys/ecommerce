import axiosInstance from "../../axios/axiosInstance";
import { categoriesAPI } from "../categories/categoriesAPI";

export async function productsLoader() {
  const [categories, productsRes] = await Promise.all([
    categoriesAPI(),
    axiosInstance.get("/api/products", { params: { page: 1 } }),
  ]);

  return {
    categories,
    products: productsRes.data.data,
    totalPages: productsRes.data.meta.last_page,
  };
}
