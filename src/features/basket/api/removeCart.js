import axiosInstance from "../../../axios/axiosInterceptor";

export async function removeCart(cartItemId) {
  const res = await axiosInstance.delete(`/api/cart-items?cartItemId=${cartItemId}`);
  return res.data;
}
