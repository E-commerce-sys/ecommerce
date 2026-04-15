import axiosInstance from "../../../../axios/axiosInterceptor";
export async function getOrders() {
  try {
    const response = await axiosInstance.get("/api/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
