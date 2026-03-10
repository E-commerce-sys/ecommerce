import axiosInstance from "../../axios/axiosInterceptor";

export async function subCategoriesAPI(parentId) {
  const response = await axiosInstance.get(
    `/api/categories?filter[parentCategory]=${parentId}&include=parent`,
  );

  return response.data.data;
}
