import { useAuthStore } from "@/store/authStore";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

export const ProtectedRoute = () => {

  const accessToken =
    useAuthStore(
      (s) => s.accessToken
    );

  if (!accessToken) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  return <Outlet />;
};