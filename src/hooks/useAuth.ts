import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { loginApi, logoutApi } from "@/features/auth/auth.api";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/auth.api";

export const useLogout = () => {
  const logout =
    useAuthStore(
      (state) => state.logout
    );
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return async () => {
    if (refreshToken) {
      try {
        await logoutApi(refreshToken);
      } catch (e) {
        console.error(e);
      }
    }
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
        data.access,
        data.refresh,
        data.user
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