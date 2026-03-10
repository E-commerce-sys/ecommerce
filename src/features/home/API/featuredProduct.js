import axiosInstance from "../../../axios/axiosInstance";

export async function featuredProductAPI() {
  const res = await axiosInstance.get("/api/products?filter[isFeatured]=true");
  return res.data.data;
}
