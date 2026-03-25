import axiosInstance from "../../axios/axiosInstance";

export async function productsAPI( id = null) {
  const res = await axiosInstance.get("/api/products/1");
  return res.data.data;
}

export async function productsPage() {
  const res = await axiosInstance.get("/api/products");
  return res.data.meta
}