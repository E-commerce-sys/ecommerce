import axiosInstance from "../../../axios/axiosInterceptor";

export async function loginAPI(email, password) {
  const response = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return response.data;
}
