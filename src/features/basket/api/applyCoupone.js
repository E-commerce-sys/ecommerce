import axiosInstance from "../../../axios/axiosInterceptor";

export async function applyCoupone({ code }) {
  const res = await axiosInstance.patch("/api/user-cart/coupon/apply", {
    code: String(code ?? "").trim(),
  });
  return res.data;
}
