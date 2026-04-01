import axiosInstance from "../../../axios/axiosInterceptor";

export async function registerAPI(
  firstName,
  lastName,
  email,
  password,
  password_confirmation,
) {
  const response = await axiosInstance.post("/api/auth/signup", {
    data: {
      attributes: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    },
  });
  return response.data;
}
