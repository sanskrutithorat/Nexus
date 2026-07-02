import { NavLink } from "react-router-dom";

import { useUIStore } from "@/store/uiStore";
import Logout from "@/features/auth/Logout";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.showOverlay : ""
          }`}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.showSidebar : ""
          }`}
      >
        <div className={styles.top}>
          <h2>Menu</h2>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/setting"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Settings
          </NavLink>

          <div className={styles.logoutSection}>
            <Logout className={styles.logoutBtn} />
          </div>
        </nav>
      </aside>
    </>


  );
};

export default Sidebar;
