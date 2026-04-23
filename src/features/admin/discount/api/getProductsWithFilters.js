import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getProductsWithFilters({ request }) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const hasDiscount = url.searchParams.get("hasDiscount");
    const category = url.searchParams.get("category");
    const page = url.searchParams.get("page");

    let endpoint = `/api/products?include=images`;

    const filters = [];

    if (hasDiscount === "true") {
      filters.push("filter[hasDiscount]=true");
    }

    if (search && search.trim()) {
      filters.push(`filter[nameEnContains]=${encodeURIComponent(search.trim())}`);
    }

    if (category && category !== "all") {
      filters.push(`filter[category]=${category}`);
    }

    if (filters.length > 0) {
      endpoint += `&${filters.join("&")}`;
    }

    if (page && page !== "1") {
      endpoint += `&page=${page}`;
    }

    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
