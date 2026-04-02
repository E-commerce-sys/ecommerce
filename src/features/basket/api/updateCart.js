import axiosInstance from "../../../axios/axiosInterceptor";

export async function updateCart(productId, { sizeId, colorId, quantity }) {
  const body = {
    data: {},
  };

  // ✅ attributes
  if (quantity !== undefined) {
    body.data.attributes = {
      quantity,
    };
  }

  // ✅ relationships
  if (colorId || sizeId) {
    body.data.relationships = {};

    if (colorId) {
      body.data.relationships.productColor = {
        data: {
          id: colorId,
        },
      };
    }

    if (sizeId) {
      body.data.relationships.productSize = {
        data: {
          id: sizeId,
        },
      };
    }
  }

  return axiosInstance.patch(`/api/cart-items?productId=${productId}`, body);
}
