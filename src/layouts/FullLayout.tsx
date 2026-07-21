import { Outlet } from "react-router-dom";
import { useUIStore } from "@/store/uiStore";
import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";

import styles from "./FullLayout.module.scss";

const FullLayout = () => {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);

  return (
    <div className={`${styles.layout} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <Sidebar />

      <div className={styles.contentWrapper}>
        <Header />

        <main className={styles.main}>
          <div className={styles.container}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FullLayout;
