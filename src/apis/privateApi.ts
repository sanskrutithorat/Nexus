import axios from "axios";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/authStore";

import { refreshTokenApi } from "../features/auth/auth.api";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

privateApi.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore.getState()
        .accessToken;

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

privateApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const store =
          useAuthStore.getState();

        const refreshResponse =
          await refreshTokenApi(
            store.refreshToken!
          );

        useAuthStore
          .getState()
          .setAuth(
            refreshResponse.access,
            refreshResponse.refresh,
            store.user!
          );

        originalRequest.headers.Authorization =
          `Bearer ${refreshResponse.access}`;

        return privateApi(
          originalRequest
        );
      } catch {
        useAuthStore
          .getState()
          .logout();

        window.location.href =
          "/auth/login";
      }
    }

    if (error.response?.data) {
      const data = error.response.data;
      if (data.success === false && data.errors?.detail) {
        toast.error(data.errors.detail);
      } else if (data.detail && error.response.status !== 401) {
        toast.error(data.detail);
      }
    }

    return Promise.reject(error);
  }
);
