import axiosInstance from "../../../../axios/axiosInterceptor";

export async function getUsers() {
  const res = await axiosInstance.get("/api/users?include=mainAddress");
  return res.data;
}
