import axiosInstance from "../../../axios/axiosInterceptor";

/**
 * POST /api/auth/verify-otp
 * Returns response body; token may be at data.token, data.data.token, etc.
 */
export async function verifyOTP({ userId, otp }) {
  const res = await axiosInstance.post("/api/auth/verify-otp", {
    userId: Number(userId),
    otp: Number(otp),
  });
  return res.data;
}
