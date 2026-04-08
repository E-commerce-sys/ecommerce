import axiosInstance from "../../../axios/axiosInterceptor";

/**
 * POST /api/auth/resend-otp
 */
export async function resendOTP({ userId, email }) {
  const res = await axiosInstance.post("/api/auth/resend-otp", {
    userId: Number(userId),
    email: String(email ?? "").trim(),
  });
  return res.data;
}
