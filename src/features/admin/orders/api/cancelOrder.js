import axiosInstance from "../../../../axios/axiosInterceptor";

export async function cancelOrder(orderId) {
  const res = await axiosInstance.patch(`/api/orders/${orderId}/cancel`);
  return res.data;
}
