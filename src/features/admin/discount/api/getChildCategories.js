import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getChildCategories() {
  const res = await axiosInstance.get("/api/categories?filter[hasParent]=true");
  return res.data;
}
