import axiosInstance from "../../../axios/axiosInterceptor";

export async function cancelOrder(orderId) {
  const res = await axiosInstance.patch(`/api/user-orders/${orderId}/cancel`);
  return res.data;
}
