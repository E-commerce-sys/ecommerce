import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.exclusive.quest", // <-- change this
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
