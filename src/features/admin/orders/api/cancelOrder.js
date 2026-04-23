import axiosInstance from "../../../../axios/axiosInterceptor";

export async function cancelOrder(orderId) {
  const res = await axiosInstance.patch(`/api/admin/orders/${orderId}/cancel`);
  return res.data;
}
