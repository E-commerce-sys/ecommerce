import axiosInstance from "../../../axios/axiosInterceptor";

export async function updateCart(cartItemId, { quantity }) {
  const res = await axiosInstance.patch(`/api/cart-items?cartItemId=${cartItemId}`, {
    data: {
      attributes: {
        quantity: Number(quantity),
      },
    },
  });
  return res.data;
}
