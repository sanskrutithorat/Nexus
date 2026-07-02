import { Outlet } from "react-router-dom";

import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";

import styles from "./FullLayout.module.scss";

const FullLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default FullLayout;
