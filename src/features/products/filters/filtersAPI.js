import axiosInstance from "../../../axios/axiosInstance";

export async function filtersAPI(
  page = 1,
  isDiscounted = false,
  minPrice = 0,
  maxPrice = 5000,
  ratingSort = null,
  isBestSelling = false,
  priceSort = null,
) {
  const params = { page };

  if (isDiscounted) params["filter[hasDiscount]"] = true;

  if (minPrice > 0 || maxPrice)
    params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;

  const sorts = [];

  if (priceSort === "low") sorts.push("price");
  if (priceSort === "high") sorts.push("-price");

  if (ratingSort === "low") sorts.push("averageRating");
  if (ratingSort === "high") sorts.push("-averageRating");

  if (sorts.length) params["sort"] = sorts;

  if (isBestSelling) params["filter[isBestSelling]"] = true;

  const res = await axiosInstance.get("/api/products", { params });

  return {
    data: res.data.data,
    meta: res.data.meta,
  };
}
