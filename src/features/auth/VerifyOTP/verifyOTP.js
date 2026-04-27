import axiosInstance from "../../../axios/axiosInterceptor";

/**
 * POST /api/auth/verify-otp
 * Body: { email: string, otp: number }
 * Returns response body; token may be at data.token, data.data.token, etc.
 */
export async function verifyOTP({ email, otp }) {
  const otpNum =
    typeof otp === "string" ? Number(String(otp).replace(/\D/g, "")) : Number(otp);
  const res = await axiosInstance.post("/api/auth/verify-otp", {
    email: String(email ?? "").trim(),
    otp: otpNum,
  });
  return res.data;
}
