import axiosInstance from "../../../axios/axiosInterceptor";

export async function cancelOrder() {
  const res = await axiosInstance.patch(`/api/user-orders/1/cancel`);
  return res.data;
}
