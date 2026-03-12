import axiosInstance from "../../../axios/axiosInstance";

export async function filtersAPI(page = 1, isDiscounted = false, minPrice = 0, maxPrice = 5000, ratingSort = null) {
  const params = { page };
  if (isDiscounted) params["filter[hasDiscount]"] = true;
  if (minPrice > 0 || maxPrice < 5000) params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;
  if (ratingSort === 'high') params["sort"] = "-averageRating";
  if (ratingSort === 'low') params["sort"] = "averageRating";
  const res = await axiosInstance.get("/api/products", { params });
  return { data: res.data.data, meta: res.data.meta };
}