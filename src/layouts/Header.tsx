// import { HiOutlineBars3 } from "react-icons/hi2";
import devyaniFarmlogo from "@/assets/logo/devyaniFarmlogo.png"
import { useUIStore } from "@/store/uiStore";

import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <button className={styles.logoBtn} onClick={toggleSidebar}>
            {/* <HiOutlineBars3 /> */}
            <img
              src={devyaniFarmlogo}
              alt="Devyani Farms"
              className={styles.logoImage}
            />
          </button>

          <div className={styles.logo}>Devyani Farms</div>
        </div>

        {/* CENTER */}
        {/* <div className={styles.center}>
          <input type="text" placeholder="Search..." className={styles.search} />
        </div> */}

        {/* RIGHT */}
        <div className={styles.right}>
          <button className={styles.actionBtn} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className={styles.actionBtn} onClick={() => navigate("/products")}>Products</button>


          <button className={styles.actionBtn} onClick={() => navigate("/setting")}>Setting</button>

          <div className={styles.avatar} onClick={() => navigate("/profile")}>A</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
