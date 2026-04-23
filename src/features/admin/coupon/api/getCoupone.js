import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getCoupone({ request }) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    let endpoint = `/api/admin/coupons?include=user`;

    if (page && page !== "1") {
      endpoint += `&page=${page}`;
    }

    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
}
