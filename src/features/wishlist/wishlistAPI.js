import axiosInstance from "../../axios/axiosInstance";

export default async function getWishlist() {
  const res = await axiosInstance("/api/wish-list?include=items");
  return res.data.data.included.items;
}