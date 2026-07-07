import {
    Mail,
    HelpCircle,
    RotateCcw,
    LogOut,
} from "react-feather";
import styles from "./ProfileCard.module.scss";
import { useLogout } from "@/hooks/useAuth";

type UserType = {
    first_name?: string;
    last_name?: string;
    email?: string;
    roles?: string;
    company?: string;
};

type ProfileCardProps = {
    user: UserType;
};

const ProfileCard = ({ user }: ProfileCardProps) => {
    const logout = useLogout();
    const getInitials = (
        firstName?: string,
        lastName?: string
    ) => {
        return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""
            }`.toUpperCase();
    };

    return (
        <div className={styles["profile-card"]}>

            {/* TOP SECTION */}
            <div className={styles["profile-card-header"]}>

                <div className={styles["profile-avatar"]}>
                    {getInitials(
                        user?.first_name,
                        user?.last_name
                    )}
                </div>

                <div className={styles["profile-user-details"]}>

                    <h3>
                        {user?.first_name} {user?.last_name}
                    </h3>

                    <span className={styles["profile-badge"]}>
                        {user?.roles || "User"}
                    </span>

                    <div className={styles["profile-detail-row"]}>
                        <Mail size={16} />
                        <span>{user?.email}</span>
                    </div>

                    <div className={styles["profile-detail-row"]}>
                        <Mail size={16} />
                        <span>
                            {user?.company || "Netflix"}
                        </span>
                    </div>

                </div>
            </div>

            {/* MENU */}
            <div className={styles["profile-card-menu"]}>

                <button className={styles["profile-menu-item"]}>
                    <RotateCcw size={18} />
                    <span>Change Password</span>
                </button>

                <button className={styles["profile-menu-item"]}>
                    <HelpCircle size={18} />
                    <span>Help and Support</span>
                </button>

            </div>

            {/* FOOTER */}
            <div className={styles["profile-card-footer"]}>
                <button className={styles["logout-button"]} onClick={logout}>
                    <LogOut size={16} />
                    <span>Log Out</span>
                </button>
                <p>© 2026 Personal project</p>

            </div>
        </div>
    );
};

export default ProfileCard;