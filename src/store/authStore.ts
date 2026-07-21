import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  organization: string;
  role: string;
  is_active: boolean;
  address: string;
  contact_number: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  setAuth: (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        user: null,

        setAuth: (
          accessToken,
          refreshToken,
          user
        ) =>
          set({
            accessToken,
            refreshToken,
            user,
          }),

        logout: () =>
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
          }),
      }),
      {
        name: "auth-storage",
      }
    )
  );
