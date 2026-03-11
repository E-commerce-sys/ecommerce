import axiosInstance from "../../axios/axiosInstance";

export async function subCategoriesAPI(parentId) {
  if (!parentId) return []; // prevent bad request

  const res = await axiosInstance.get(
    `/api/categories?filter[parentCategory]=${parentId}&include=parent`,
  );

  return res.data.data;
}
