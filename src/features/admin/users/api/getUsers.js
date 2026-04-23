import axiosInstance from "../../../../axios/axiosInterceptor";

/**
 * Load admin users outside route loaders (e.g. coupon “assign to user” select).
 * Accepts the same search/page semantics as the route loader.
 */
export async function fetchAdminUsersForSelect(options = {}) {
  const search = options.search ?? "";
  const page = options.page ?? "1";
  const u = new URL("http://rr.internal/");
  if (String(search).trim()) {
    u.searchParams.set("search", String(search).trim());
  }
  u.searchParams.set("page", String(page));
  return getUsers({ request: { url: u.href } });
}

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
