import { ExternalLink, Edit2 } from "react-feather";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  id: string;
  budget: string;
  title: string;
  subtitle: string;
  status?: "new" | "in_progress" | "completed";
  client?: string;
  startDate?: string;
  endDate?: string;
  onEdit?: () => void;
}

const ProjectCard = ({
  id,
  budget,
  title,
  subtitle,
  status,
  client,
  startDate,
  endDate,
  onEdit
}: ProjectCardProps) => {
  let statusClass = "";
  let badgeClass = "";
  let displayStatus = status as string;

  if (status === "new") {
    statusClass = styles.statusNew;
    badgeClass = styles.new;
    displayStatus = "New";
  } else if (status === "in_progress") {
    statusClass = styles.statusInProgress;
    badgeClass = styles.inProgress;
    displayStatus = "In Progress";
  } else if (status === "completed") {
    statusClass = styles.statusCompleted;
    badgeClass = styles.completed;
    displayStatus = "Completed";
  }

  return (
    <div className={`${styles.projectCard} ${statusClass}`}>
      <div className={styles.cardTop}>
        <div className={styles.badgeAndId}>
          {status && <span className={`${styles.badge} ${badgeClass}`}>{displayStatus}</span>}
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
              <button className={styles.editBtn} onClick={onEdit}>
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
