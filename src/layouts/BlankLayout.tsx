import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Remove dark theme to force light mode on public pages
    document.documentElement.removeAttribute('data-theme');

    return () => {
      // Restore the user's theme preference when leaving the public pages
      if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
      }
    };
  }, []);

  return <Outlet />;
}

export default BlankLayout;
