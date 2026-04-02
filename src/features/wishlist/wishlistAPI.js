import axiosInstance from "../../axios/axiosInterceptor";

export async function getWishlist(page) {
  const res = await axiosInstance(
    `/api/wish-list-items?include=product.images&page=${page}`,
  );
  return res.data.data;
}

export async function postWishlist(id) {
  const res = await axiosInstance.post("/api/wish-list-items", {
    data: {
      relationships: {
        product: {
          data: {
            id: Number(id),
          },
        },
      },
    },
  });
  return res.data;
}

export async function deleteWishlistItem(id) {
  const res = await axiosInstance.delete(
    `/api/wish-list-items/?productId=${id}`,
  );
  return res.data;
}

function extractCategoryIds(wishlistItems) {
  const categoryIds = new Set();
  wishlistItems.forEach((item) => {
    const categoryId = item.included.product.relationships.category.data.id;
    if (categoryId) categoryIds.add(categoryId);
  });
  return categoryIds;
}

export async function getSimilarProducts(wishlistItems) {
  const categoryIds = extractCategoryIds(wishlistItems);
  const res = await axiosInstance(
    `/api/similar-products?categoryIds=${[...categoryIds]}`,
  );
  return res.data.data;
}

export async function getPagination(page = 1) {
  const res = await axiosInstance(`/api/wish-list-items?page=${page}`);
  return res.data.meta;
}

export async function getItemAmount() {
  const res = await axiosInstance(
    "/api/wish-list-items?include=product.images",
  );
  return res.data.meta.total;
}
