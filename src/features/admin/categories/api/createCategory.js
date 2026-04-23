import axiosInstance from "../../../../axios/axiosInterceptor";

/**
 * multipart/form-data — interceptor strips default JSON Content-Type so the
 * browser sets multipart boundary; icon must be appended as a File in the UI.
 */
export async function createCategory(formData) {
  const res = await axiosInstance.post("/api/admin/categories", formData);
  return res.data;
}
