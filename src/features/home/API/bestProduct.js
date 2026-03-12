import axiosInstance from "../../../axios/axiosInstance";

export async function bestProductAPI() {
  const res = await axiosInstance.get(
    "/api/products?filter[isBestSelling]=true",
  );
  return  {data: res.data.data, meta: res.data.meta };
}
