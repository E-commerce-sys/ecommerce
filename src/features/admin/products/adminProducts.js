import { meta } from "zod/v4/core";
import axiosInstance from "../../../axios/axiosInterceptor";

export async function addProduct(formData) {
  const res = await axiosInstance.post("/api/products", formData);
  return res.data;
}

export async function getProducts(page = 1, filters = {}) {
  const params = { page };

  if (filters.search) params["filter[nameEnContains]"] = filters.search;
  if (filters.category) params["filter[category]"] = filters.category;
  if (filters.tag) params[`filter[${filters.tag}]`] = true;

  const res = await axiosInstance.get("/api/products?include=category", {
    params,
  });
  return res.data;
}

export async function getsubCategories(id) {
  const res = await axiosInstance.get(
    `/api/categories?filter[parentCategory]=${id}`,
  );
  return res.data.data;
}

export async function editProduct(id, formData) {
  const res = await axiosInstance.put(`/api/products/${id}`, formData);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axiosInstance.delete(`/api/products/${id}`);
  return res.data;
}

export async function getOneProduct(id) {
  const res = await axiosInstance.get(
    `/api/products/${id}?include=category,variants.color,variants.size`,
  );
  return res.data;
}
