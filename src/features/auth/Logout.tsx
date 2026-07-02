import { useLogout } from "@/hooks/useAuth";

type LogoutProps = {
  children?: React.ReactNode;
  className?: string;
};

const Logout = ({
  children = "Logout",
  className,
}: LogoutProps) => {
  const logout = useLogout();

  return (
    <button
      type="button"
      className={className}
      onClick={logout}
    >
      {children}
    </button>
  );
};

export default Logout;