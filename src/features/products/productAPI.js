import axiosInstance from "../../axios/axiosInstance";

export async function productsAPI() {
  const res = await axiosInstance.get("/api/products");
  return res.data.data;
}
