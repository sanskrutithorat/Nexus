import type { ReactNode } from "react";
import styles from "./KpiCard.module.scss";

interface KpiCardProps {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  amount: string | number;
  growthText?: string;
  growthType?: "positive" | "neutral" | "negative";
  arrow?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  icon,
  iconColor = "#4f46e5",
  amount,
  growthText,
  growthType = "neutral",
  arrow,
}) => {
  return (
    <div className={styles.kpicard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.iconBtn} style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
      <h1 className={styles.amount}>{amount}</h1>
      {growthText && (
        <div className={`${styles.growth} ${styles[growthType] || ""}`}>
          {arrow && <span className={styles.arrow}>{arrow}</span>}
          <span>{growthText}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
