import axiosInstance from "../../../../axios/axiosInterceptor";

export async function updateOrdersState({ orderIds }) {
  try {
    const response = await axiosInstance.patch(
      `/api/orders/next-status?orderIds=${orderIds.join(",")}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order states:", error);
    throw error;
  }
}
