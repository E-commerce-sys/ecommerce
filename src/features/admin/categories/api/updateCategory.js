import axiosInstance from "../../../../axios/axiosInterceptor";

export async function updateCategory(categoryId, formData) {
  try {
    const res = await axiosInstance.patch(
      `/api/admin/categories/${categoryId}`,
      formData,
    );
    return res.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}
