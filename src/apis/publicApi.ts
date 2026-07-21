import axios from "axios";
import toast from "react-hot-toast";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const data = error.response.data;
      if (data.success === false && data.errors?.detail) {
        toast.error(data.errors.detail);
      } else if (data.detail) {
        toast.error(data.detail);
      }
    }
    return Promise.reject(error);
  }
);
