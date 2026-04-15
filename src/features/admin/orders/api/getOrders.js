import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getOrders({ request }) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const page = url.searchParams.get("page");

    let endpoint = `/api/orders?include=user,shippingAddress,orderItems.productVariant.product.images,orderItems.productVariant.color,orderItems.productVariant.size,orderItems.productVariant.product.productColors,orderItems.productVariant.product.productSizes`;

    // ✅ ONLY add filter if status exists
    if (status && status !== "all") {
      endpoint += `&filter[status]=${status}`;
    }
    if (page && page !== "1") {
      endpoint += `&page=${page}`;
    }

    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
