import axiosInstance from "../../../axios/axiosInterceptor";

/**
 * POST /api/order?isNewAddress=&saveAddressToUser=
 * Body shape matches backend JSON:API-style payload.
 */
export async function createOrder({
  isNewAddress = false,
  saveAddressToUser = false,
  body,
}) {
  const q = new URLSearchParams({
    isNewAddress: String(!!isNewAddress),
    saveAddressToUser: String(!!saveAddressToUser),
  });
  const res = await axiosInstance.post(`/api/order?${q.toString()}`, body);
  return res.data;
}
