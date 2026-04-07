import axiosInstance from "../../../axios/axiosInstance";

export async function getUserAPI() {
  const res = await axiosInstance.get("/api/user");
  return res.data.data;
}