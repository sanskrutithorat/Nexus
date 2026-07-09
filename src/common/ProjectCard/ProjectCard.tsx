import { ExternalLink, Edit2 } from "react-feather";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  id: string;
  budget: string;
  title: string;
  subtitle: string;
  status?: "NEW" | "IN PROGRESS";
  client?: string;
  startDate?: string;
  endDate?: string;
}

const ProjectCard = ({
  id,
  budget,
  title,
  subtitle,
  status,
  client,
  startDate,
  endDate
}: ProjectCardProps) => {
  let statusClass = "";
  let badgeClass = "";
  
  if (status === "NEW") {
    statusClass = styles.statusNew;
    badgeClass = styles.new;
  } else if (status === "IN PROGRESS") {
    statusClass = styles.statusInProgress;
    badgeClass = styles.inProgress;
  }

  return (
    <div className={`${styles.projectCard} ${statusClass}`}>
      <div className={styles.cardTop}>
        <div className={styles.badgeAndId}>
          {status && <span className={`${styles.badge} ${badgeClass}`}>{status}</span>}
          <span className={styles.idText}>ID: {id}</span>
        </div>
        <div className={styles.budgetInfo}>
          <div className={styles.budgetLabel}>Budget</div>
          <div className={styles.budgetAmount}>{budget}</div>
        </div>
      </div>
      
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      
      {(client || (startDate && endDate)) && (
        <div className={styles.footer}>
          {client ? (
            <div className={styles.clientInfo}>
              Client: 
              <span className={styles.clientLink}>
                <ExternalLink size={14} /> {client}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          
          {(startDate && endDate) && (
            <div className={styles.datesAndEdit}>
              <div className={styles.dates}>
                Start: {startDate} &nbsp;&nbsp; End: {endDate}
              </div>
              <button className={styles.editBtn}>
                <Edit2 size={14} /> Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
