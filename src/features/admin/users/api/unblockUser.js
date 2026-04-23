import axiosInstance from "../../../../axios/axiosInterceptor";

export async function unblockUser(userId) {
  const res = await axiosInstance.patch(`/api/admin/users/${userId}/unblock`);
  return res.data;
}
