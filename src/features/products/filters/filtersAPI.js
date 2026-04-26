// import axiosInstance from "../../../axios/axiosInstance";
// import i18n from "i18next";

// /**
//  * Shared by `filtersAPI` and `productsLoader` so the route loader and filters
//  * use the same query shape.
//  */
// export function buildProductsQueryParams({
//   page = 1,
//   search = "",
//   isDiscounted = false,
//   minPrice,
//   maxPrice,
//   ratingSort = null,
//   isBestSelling = false,
//   priceSort = null,
//   discount = null,
//   category,
// } = {}) {
//   const params = { page: Number(page) || 1 };

//   if (search) {
//     const map = {
//       en: "nameEnContains",
//       ar: "nameArContains",
//       ku: "nameKuContains",
//     };

//     const field = map[i18n.language] || "nameEnContains";

//     params[`filter[${field}]`] = search;
//   }

//   if (discount !== null && discount !== undefined) {
//     params["filter[discountPercentage]"] = discount;
//   }

//   if (isDiscounted) params["filter[hasDiscount]"] = true;

//   // if (maxPrice === undefined && minPrice !== undefined){
//   //   params["filter[minPrice]"] = `${minPrice}`
//   // }

//   // if(minPrice === undefined && maxPrice !== undefined){
//   //   params["filter[maxPrice]"] = `${maxPrice}`
//   // }

//   // if (minPrice > 0 || maxPrice) {
//   //   params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;
//   // }

//   const hasMin = minPrice !== 0 && minPrice !== null && minPrice !== "";
// const hasMax = maxPrice !== 0 && maxPrice !== null && maxPrice !== "";

// if (hasMin && hasMax) {
//   params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;
// } else if (hasMin) {
//   params["filter[minPrice]"] = `${minPrice}`;
// } else if (hasMax) {
//   params["filter[maxPrice]"] = `${maxPrice}`;
// }
//   const sorts = [];

//   if (priceSort === "low") sorts.push("price");
//   if (priceSort === "high") sorts.push("-price");

//   if (ratingSort === "low") sorts.push("averageRating");
//   if (ratingSort === "high") sorts.push("-averageRating");

//   if (sorts.length) params.sort = sorts.join(",");

//   if (isBestSelling) params["filter[isBestSelling]"] = true;

//   if (category) params["filter[category]"] = category;
//    console.log(params)
//   return params;
// }

// export async function filtersAPI(
//   page = 1,
//   search = "",
//   isDiscounted = false,
//   minPrice,
//   maxPrice,
//   ratingSort = null,
//   isBestSelling = false,
//   priceSort = null,
//   discount = null,
//   category,
// ) {
//   const params = buildProductsQueryParams({
//     page,
//     search,
//     isDiscounted,
//     minPrice,
//     maxPrice,
//     ratingSort,
//     isBestSelling,
//     priceSort,
//     discount,
//     category,
//   });

//   const res = await axiosInstance.get("/api/products", { params });

//   return {
//     data: res.data.data,
//     meta: res.data.meta,
//   };
// }

import axiosInstance from "../../../axios/axiosInstance";
import i18n from "i18next";

export function buildProductsQueryParams({
  page = 1,
  search = "",
  isDiscounted = false,
  minPrice,
  maxPrice,
  ratingSort = null,
  isBestSelling = false,
  priceSort = null,
  discount = null,
  category,
  firstSort = null, // ← fixed from sortOrder
} = {}) {
  const params = { page: Number(page) || 1 };

  if (search) {
    const map = {
      en: "nameEnContains",
      ar: "nameArContains",
      ku: "nameKuContains",
    };
    const field = map[i18n.language] || "nameEnContains";
    params[`filter[${field}]`] = search;
  }

  if (discount !== null && discount !== undefined) {
    params["filter[discountPercentage]"] = discount;
  }

  if (isDiscounted) params["filter[hasDiscount]"] = true;

  const hasMin = minPrice !== undefined && minPrice !== null && minPrice !== "";
  const hasMax = maxPrice !== undefined && maxPrice !== null && maxPrice !== "";

  if (hasMin && hasMax) {
    params["filter[priceBetween]"] = `${minPrice},${maxPrice}`;
  } else if (hasMin) {
    params["filter[minPrice]"] = `${minPrice}`;
  } else if (hasMax) {
    params["filter[maxPrice]"] = `${maxPrice}`;
  }

  const sorts = [];
  if (firstSort === "rating") {
    if (ratingSort === "low") sorts.push("averageRating");
    if (ratingSort === "high") sorts.push("-averageRating");
    if (priceSort === "low") sorts.push("price");
    if (priceSort === "high") sorts.push("-price");
  } else {
    if (priceSort === "low") sorts.push("price");
    if (priceSort === "high") sorts.push("-price");
    if (ratingSort === "low") sorts.push("averageRating");
    if (ratingSort === "high") sorts.push("-averageRating");
  }
  if (sorts.length) params.sort = sorts.join(",");

  if (isBestSelling) params["filter[isBestSelling]"] = true;

  if (category) params["filter[category]"] = category;

  return params;
}

export async function filtersAPI(
  page = 1,
  search = "",
  isDiscounted = false,
  minPrice,
  maxPrice,
  ratingSort = null,
  isBestSelling = false,
  priceSort = null,
  discount = null,
  category,
  firstSort = null, // ← fixed from sortOrder
) {
  const params = buildProductsQueryParams({
    page,
    search,
    isDiscounted,
    minPrice,
    maxPrice,
    ratingSort,
    isBestSelling,
    priceSort,
    discount,
    category,
    firstSort, // ← fixed from sortOrder
  });

  const res = await axiosInstance.get("/api/products", { params });

  return {
    data: res.data.data,
    meta: res.data.meta,
  };
}