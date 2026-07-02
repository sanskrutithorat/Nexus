import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  roles?: string[];
};

const RoleRoute = ({
  roles = [],
}: Props) => {
  const user = useAuthStore(
    (s) => s.user
  );

  // No roles provided => allow access
  if (roles.length === 0) {
    return <Outlet />;
  }

  const role = user?.role;

  // Roles required but user has no role
  if (!role) {
    return (
      <Navigate
        to="/403"
        replace
      />
    );
  }

  // User role not allowed
  if (!roles.includes(role)) {
    return (
      <Navigate
        to="/403"
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleRoute;