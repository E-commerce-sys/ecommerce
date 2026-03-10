import axiosInstance from "../../../axios/axiosInstance";

export async function newArrivalProductAPI() {
  const res = await axiosInstance.get(
    "/api/products?filter[isNewArrival]=true",
  );
  return res.data.data;
}
