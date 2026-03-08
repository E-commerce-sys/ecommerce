import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://51.21.2.193", // <-- change this
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
