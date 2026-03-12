import axiosInstance from "../../../axios/axiosInstance";

export async function filtersAPI(page = 1, isDiscounted = false, minPrice = 0, maxPrice = 5000, ratingSort = null,isBestSelling = false) {
  const params = { page };
  if (isDiscounted) params["filter[hasDiscount]"] = true;
  if (minPrice > 0 || maxPrice < 5000) params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;
  if (ratingSort === 'high') params["sort"] = "-averageRating";
  if (ratingSort === 'low') params["sort"] = "averageRating";
  if (isBestSelling) params["filter[isBestSelling]"] = true;
  const res = await axiosInstance.get("/api/products", { params });
  return { data: res.data.data, meta: res.data.meta };
}