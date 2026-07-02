import { HiOutlineMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LEFT: Search */}
        <div className={styles.left}>
          <div className={styles.searchWrapper}>
            <HiOutlineMagnifyingGlass className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search customers, companies, domains..."
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* Role Preview */}
          <div className={styles.rolePreview}>
            <span className={styles.roleLabel}>Role Preview:</span>
            <button className={`${styles.roleBtn} ${styles.roleActive}`}>
              👑 Admin
            </button>
            <button className={styles.roleBtn}>
              🏆 Employee
            </button>
            <button className={styles.roleBtn}>
              👁️ Viewer
            </button>
          </div>

          {/* Admin Badge */}
          <div className={styles.adminBadge}>
            <span className={styles.dot}></span>
            🔥 Admin Role
          </div>

          {/* Bell Icon */}
          <button className={styles.bellBtn}>
            <HiOutlineBell size={24} color="#6b7280" />
            <span className={styles.notificationDot}></span>
          </button>
          
          <button className={styles.avatarBtn}>
            MH
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
