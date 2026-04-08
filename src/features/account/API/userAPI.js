import axiosInstance from "../../../axios/axiosInstance";

export async function getUserAPI() {
  const res = await axiosInstance.get("/api/user");
  return res.data.data;
}

export async function updateUserAPI(payload) {
  const update = {
    data: {
      attributes: payload
    }
  };

  const res = await axiosInstance.patch("/api/user", update);
  return res.data.data;
}