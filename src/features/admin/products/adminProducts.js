import { meta } from "zod/v4/core";
import axiosInstance from "../../../axios/axiosInterceptor"

export async function addProduct(formData) {
  const res = await axiosInstance.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function getProducts(page = 1){
    const res = await axiosInstance.get(`/api/products?page=${page}&include=category`)
    return {
        data: res.data.data,
        meta: res.data.meta
    };
}

export async function getsubCategories(id) {
    const res = await axiosInstance.get(`/api/categories?filter[parentCategory]=${id}`)
    return res.data.data;
}

export async function editProduct(id, formData) {
  const res = await axiosInstance.put(`/api/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function deleteProduct(id) {
  const res = await axiosInstance.delete(`/api/products/${id}`);
  return res.data;
}