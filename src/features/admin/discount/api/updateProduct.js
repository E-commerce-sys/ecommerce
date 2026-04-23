import axiosInstance from "../../../../axios/axiosInterceptor";

export async function updateProduct(productId, data) {
  const res = await axiosInstance.patch(
    `/api/admin/products/${productId}`,
    data,
  );
  return res.data;
}
