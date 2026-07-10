import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "@/store/themeStore";

function BlankLayout() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Force light mode on all public pages
    document.documentElement.removeAttribute("data-theme");

    // Restore the user's preferred theme when leaving public pages
    return () => {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    };
  }, [theme]);

  return <Outlet />;
}

export default BlankLayout;
