import axiosInstance from "../../../axios/axiosInterceptor";

export async function getCartItems() {
  const res = await axiosInstance.get(
    "/api/user-cart?include=cartItems.product.images,cartItems.product.productColors,cartItems.product.productSizes",
  );
  return res.data;
}
