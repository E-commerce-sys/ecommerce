import axiosInstance from "../../../axios/axiosInstance";

export async function bannerProductAPI() {
  const res = await axiosInstance.get("/api/banners");
  return res.data.data;
}
