import axiosInstance from "../../../../axios/axiosInterceptor";

const IN_PROGRESS_STATUSES = ["Pending", "Preparing", "Shipping", "Delivering"];

function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function getOrders({ request }) {
  try {
    const url = new URL(request.url);
    const section = url.searchParams.get("section") || "in-progress";
    const status = url.searchParams.get("status");
    const page = url.searchParams.get("page");

    let endpoint = `/api/orders?include=user,shippingAddress,orderItems.productVariant.product.images,orderItems.productVariant.color,orderItems.productVariant.size,orderItems.productVariant.product.productColors,orderItems.productVariant.product.productSizes`;

    if (section === "in-progress") {
      if (status && status !== "all") {
        const capitalizedStatus = capitalizeFirstLetter(status);
        endpoint += `&filter[status]=${capitalizedStatus}`;
      } else {
        const inProgressFilter = IN_PROGRESS_STATUSES.join(",");
        endpoint += `&filter[status]=${inProgressFilter}`;
      }
    } else if (section === "arrived") {
      endpoint += `&filter[status]=Arrived`;
    } else if (section === "cancelled") {
      endpoint += `&filter[status]=Cancelled`;
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
