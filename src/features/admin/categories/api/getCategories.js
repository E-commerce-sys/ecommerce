import axiosInstace from "../../../../axios/axiosInterceptor";

export async function getCategories() {
  const res = await axiosInstace.get(
    "/api/categories?include=children&filter[parentCategory]=",
  );
  console.log(res.data);
  return res.data;
}
