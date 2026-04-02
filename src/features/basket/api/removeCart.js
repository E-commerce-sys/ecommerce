import axiosInstance from "../../../axios/axiosInterceptor";

export async function removeCart(productId) {
  return axiosInstance.delete(`/api/cart-items?productId=${productId}`);
}
