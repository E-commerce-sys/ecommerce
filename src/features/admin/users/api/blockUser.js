import axiosInstance from "../../../../axios/axiosInterceptor";
export async function blockUser(userId) {
  const res = await axiosInstance.patch(`/api/admin/users/${userId}/block`);
  return res.data;
}
