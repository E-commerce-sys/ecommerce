import axiosInstance from "../../../axios/axiosInterceptor";

export async function updateCart(cartItemId, { quantity }) {
  return axiosInstance.patch(`/api/cart-items?cartItemId=${cartItemId}`, {
    data: {
      attributes: {
        quantity: Number(quantity),
      },
    },
  });
}
