import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/features/auth/auth.api";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/auth.api";

export const useLogout = () => {
  const logout =
    useAuthStore(
      (state) => state.logout
    );

  return () => {
    logout();

    localStorage.removeItem(
      "auth-storage"
    );

    window.location.href =
      "/auth/login";
  };
};


export const useLogin = () => {
  const setAuth = useAuthStore(
    (s) => s.setAuth
  );

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      setAuth(
        data.accessToken,
        data.refreshToken,
        {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        }
      );
    },
  });
};




export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
};