import axiosInstance from "../../../axios/axiosInterceptor";

export async function cancelOrder(orderId, { status = "cancelled" } = {}) {
  const res = await axiosInstance.patch(`/api/order/${orderId}`, {
    data: {
      attributes: {
        status,
      },
    },
  });
  return res.data;
}
