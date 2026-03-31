import axiosInstance from "../../axios/axiosInstance";

export async function categoryAPI( id) {
  const res = await axiosInstance.get(`/api/products/${id}`);
  return res.data.data.relationships.category.data.id;
}

export async function getSimilarProducts(categoryId) {
  const res = await axiosInstance(`/api/similar-products?categoryIds=${categoryId}`);
  return res.data.data;
}
