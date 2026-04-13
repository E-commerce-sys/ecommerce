import axiosInstace from "../../../../axios/axiosInterceptor";

export async function createCategory(categoryData) {
  const res = await axiosInstace.post("/api/categories", categoryData);
  console.log(res.data);
  return res.data;
}
