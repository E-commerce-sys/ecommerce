import axiosInstance from "../../../axios/axiosInstance";

export async function removeCart(productId) {
  return axiosInstance.delete(`/api/cart-items?productId=${productId}`);
}
