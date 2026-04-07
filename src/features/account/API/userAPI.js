import axiosInstance from "../../../axios/axiosInstance";

export async function getUserAPI() {
  const res = await axiosInstance.get("/api/user");
  return res.data.data;
}

export async function updateUserAPI(data) {
  const res = await axiosInstance.patch("/api/user", data);
  return res.data.data;
}