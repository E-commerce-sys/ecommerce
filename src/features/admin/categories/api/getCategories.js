import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getCategories() {
  const res = await axiosInstance.get(
    "/api/categories?include=children&filter[parentCategory]=",
  );
  return res.data;
}
