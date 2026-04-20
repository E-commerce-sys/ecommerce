import axiosInstance from "../../../axios/axiosInterceptor";

export const getContacts = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    let endpoint = `/api/contacts`;
    if (page && page !== "1") {
      endpoint += `?page=${page}`;
    }

    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};
