import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getUsers({ request }) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const page = url.searchParams.get("page") || "1";

    let endpoint = `/api/admin/users?include=mainAddress`;

    // Add search filters if search term exists
    if (search.trim()) {
      endpoint += `&filter[firstName]=${encodeURIComponent(search.trim())}`;
      endpoint += `&filter[lastName]=${encodeURIComponent(search.trim())}`;
      endpoint += `&filter[email]=${encodeURIComponent(search.trim())}`;
    } else {
      // Add empty filters when no search
      endpoint += `&filter[firstName]=&filter[lastName]=&filter[email]=`;
    }

    // Add pagination
    if (page && page !== "1") {
      endpoint += `&page=${page}`;
    }

    const res = await axiosInstance.get(endpoint);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
