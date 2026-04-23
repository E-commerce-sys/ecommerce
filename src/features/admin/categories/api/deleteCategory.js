import axiosInstance from "../../../../axios/axiosInterceptor";
export async function deleteCategory(categoryId) {
  try {
    const response = await axiosInstance.delete(
      `/api/admin/categories/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
