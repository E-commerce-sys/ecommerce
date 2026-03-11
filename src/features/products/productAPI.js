import axiosInstance from "../../axios/axiosInstance";

export async function productsAPI(page = 1) {
  const res = await axiosInstance.get("/api/products", { params: { page } });
  return res.data.data;
}

export async function productsPage() {
  const res = await axiosInstance.get("/api/products");
  return res.data.meta
}
