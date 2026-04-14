import axiosInstance from "../../../../axios/axiosInterceptor";
export const getOneCategory = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/categories/${id}?include=parent`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
