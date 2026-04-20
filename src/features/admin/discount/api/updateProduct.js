import axiosInstance from "../../../../axios/axiosInterceptor";

export async function updateProduct(productId, data) {
  const res = await axiosInstance.patch(`/api/products/${productId}`, data);
  return res.data;
}
