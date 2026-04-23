import { getStaffList } from "../staffAPI";

export async function getStaff({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const page = url.searchParams.get("page") || "1";
  return getStaffList(search, page);
}
