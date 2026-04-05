import axiosInstance from "../../../axios/axiosInterceptor";

export async function removeCart(cartItemId) {
  return axiosInstance.delete(`/api/cart-items?cartItemId=${cartItemId}`);
}
