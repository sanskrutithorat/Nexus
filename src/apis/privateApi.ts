import axios from "axios";

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

    return Promise.reject(error);
  }
);