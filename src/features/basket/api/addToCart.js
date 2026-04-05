import axiosInstance from "../../../axios/axiosInterceptor";

export async function addToCart(productVariantId, quantity) {
  const res = await axiosInstance.post("/api/cart-items", {
    data: {
      attributes: {
        quantity: Number(quantity),
      },
      relationships: {
        productVariant: {
          data: {
            id: Number(productVariantId),
          },
        },
      },
    },
  });

  return res.data;
}
