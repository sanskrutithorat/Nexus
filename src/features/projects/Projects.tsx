import { Download, Plus, CreditCard, Activity, CheckCircle, Layers } from "react-feather";
import KpiCard from "@/common/KpiCard/KpiCard";
import styles from "./Projects.module.scss";


const Projects = () => {

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Projects Dashboard</h1>
          <p className={styles.pageSubtitle}>Monitor project deliverables, currency budgets, and timelines</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addBtn} >
            <Plus size={16} />
            Create Project
          </button>
        </div>
      </div>
      <div className={styles.kpiContainer}>
        <KpiCard
          title="TOTAL PROJECT BUDGET"
          icon={<CreditCard size={20} />}
          iconColor="#4f46e5"
          amount="$1,480,000"
          growthText="+18.4% from last quarter"
          growthType="positive"
          arrow="↗"
        />

        <KpiCard
          title="ACTIVE PROJECTS"
          icon={<Activity size={20} />}
          iconColor="#f59e0b"
          amount="24"
          growthText="12 in progress, 12 new"
          growthType="neutral"
        />

        <KpiCard
          title="COMPLETED PROJECTS"
          icon={<CheckCircle size={20} />}
          iconColor="#10b981"
          amount="12"
          growthText="100% customer satisfaction"
          growthType="positive"
        />

        <KpiCard
          title="AVERAGE BUDGET"
          icon={<Layers size={20} />}
          iconColor="#8b5cf6"
          amount="$123,333"
          growthText="Across 36 total projects"
          growthType="neutral"
        />
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filterLeft}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Organization:</span>
            <button className={styles.filterSelect}>
              All Organizations
            </button>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Status:</span>
            <button className={styles.filterSelect}>
              All Statuses
            </button>
          </div>
        </div>
        <div className={styles.filterRight}>
          Showing 1 - 6 of customers
        </div>
      </div>

    </div>
  );
}
export default Projects;