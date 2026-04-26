import axiosInstance from "../../../../axios/axiosInterceptor";

/**
 * POST /api/admin/coupons
 * @param {object} body - JSON:API-style body (data.attributes, data.relationships.user)
 */
export async function createCoupone(body) {
  const res = await axiosInstance.post("/api/admin/coupons", body);
  return res.data;
}
