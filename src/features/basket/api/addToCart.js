import axiosInstance from "../../../axios/axiosInterceptor";

export async function addToCart(productId, sizeId, colorId, quantity) {
  const relationships = {
    product: {
      data: {
        id: Number(productId),
      },
    },
  };

  // ✅ add size only if exists
  if (sizeId) {
    relationships.productSize = {
      data: {
        id: Number(sizeId),
      },
    };
  }

  // ✅ add color only if exists
  if (colorId) {
    relationships.productColor = {
      data: {
        id: Number(colorId),
      },
    };
  }

  const res = await axiosInstance.post("/api/cart-items", {
    data: {
      attributes: {
        quantity: Number(quantity),
      },
      relationships,
    },
  });

  return res.data;
}
