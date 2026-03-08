import axiosInstance from "../../axios/axiosInterceptor";

export async function categoriesAPI() {
  const response = await axiosInstance.get("/api/categories");

  return response.data;
}
