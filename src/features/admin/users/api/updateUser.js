import axiosInstance from "../../../../axios/axiosInterceptor";

export async function updateUser(userId, data) {
  const res = await axiosInstance.patch(`/api/admin/users/${userId}`, data);
  return res.data;
}
