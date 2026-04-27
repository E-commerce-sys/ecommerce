import axiosInstance from "../../../axios/axiosInterceptor";

/**
 * POST /api/auth/resend-otp
 */
export async function resendOTP({ email }) {
  const res = await axiosInstance.post("/api/auth/resend-otp", {
    email: String(email ?? "").trim(),
  });
  return res.data;
}
