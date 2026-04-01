import axiosInstance from "../../axios/axiosInstance";

export async function productsAPI( id = null) {
  const res = await axiosInstance.get("/api/products");
  return res.data.data;
}

export async function productAPI( id) {
  const res = await axiosInstance.get(`/api/products/${id}?include=productSizes,productColors`);
  return res.data.data;
}

export async function productsPage() {
  const res = await axiosInstance.get("/api/products");
  return res.data.meta
}