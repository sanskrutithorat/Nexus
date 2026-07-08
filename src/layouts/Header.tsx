import { HiOutlineMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import ProfileCard from "./profileCard/ProfileCard";
import styles from "./Header.module.scss";
import { useMe } from "@/hooks/useAuth";

const Header = () => {
  const { data: userProfile } = useMe();

  const user = {
    first_name: userProfile?.first_name || "",
    last_name: userProfile?.last_name || "",
    email: userProfile?.email || "",
    roles: userProfile?.role || "",
    company: userProfile?.organization || ""
  };

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

          {/* <button className={styles.avatarBtn}>
            MH
          </button> */}
          <Dropdown align="end">
            <Dropdown.Toggle
              className={`d-flex align-items-center gap-2 bg-white border-0 ${styles.profileTrigger}`}
              variant="transparent"
              id="profile-dropdown"
            >
              {/* <span className={styles.profileName}>
                John Doe
              </span> */}

              <div className={styles.profileAvatarSmall}>
                {`${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className={`p-0 border-0 shadow-lg ${styles.profileMenu}`}>
              <ProfileCard user={user} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
