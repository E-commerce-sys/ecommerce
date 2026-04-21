import axiosInstance from "../../../../axios/axiosInterceptor";

export async function deleteUser(userId) {
  const res = await axiosInstance.delete(`/api/users/${userId}`);
  return res.data;
}
