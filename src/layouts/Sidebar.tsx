import { NavLink } from "react-router-dom";
import { useUIStore } from "@/store/uiStore";
import Logout from "@/features/auth/Logout";
import {
  HiOutlineRectangleGroup,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlineFolder,
  HiOutlineArrowRightOnRectangle
} from "react-icons/hi2";
import Nexuslogo from "@/assets/logo/Background.svg";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.showSidebar : styles.closedSidebar}`}>
      <div className={styles.top} onClick={toggleSidebar}>
        <img src={Nexuslogo} alt="Nexus Logo" className={styles.logoImage} />
        <div className={styles.logoTextContainer}>
          <h2>NexusCRM</h2>
          <span className={styles.logoSubText}>Enterprise Suite</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HiOutlineRectangleGroup size={24} className={styles.icon} />
          <span className={styles.linkText}>Dashboard</span>
        </NavLink>
        <NavLink
          to="/customer"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HiOutlineUsers size={24} className={styles.icon} />
          <span className={styles.linkText}>Customer</span>
        </NavLink>

        <NavLink
          to="/task"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HiOutlineClipboardDocumentList size={24} className={styles.icon} />
          <span className={styles.linkText}>Task</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HiOutlineFolder size={24} className={styles.icon} />
          <span className={styles.linkText}>Projects</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HiOutlineUser size={24} className={styles.icon} />
          <span className={styles.linkText}>Profile</span>
        </NavLink>

        <NavLink
          to="/setting"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          <HiOutlineCog6Tooth size={24} className={styles.icon} />
          <span className={styles.linkText}>Settings</span>
        </NavLink>

        <div className={styles.logoutSection}>
          <Logout className={styles.logoutBtn}>
            <HiOutlineArrowRightOnRectangle size={24} className={styles.icon} />
            <span className={styles.linkText}>Logout</span>
          </Logout>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
