import { useState } from "react";
import { Plus, CreditCard, Activity, CheckCircle, Layers, Clock, Box } from "react-feather";
import KpiCard from "@/common/KpiCard/KpiCard";
import styles from "./Projects.module.scss";
import ProjectCard from "@/common/ProjectCard/ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Projects Dashboard</h1>
          <p className={styles.pageSubtitle}>Monitor project deliverables, currency budgets, and timelines</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            Create Project
          </button>
        </div>
      </div>
      <div className={styles.kpiContainer}>
        <KpiCard
          title="TOTAL PROJECT BUDGET"
          icon={<CreditCard size={30} />}
          iconColor="#4f46e5"
          amount="$1,480,000"
          growthText="+18.4% from last quarter"
          growthType="positive"
          arrow="↗"
        />

        <KpiCard
          title="ACTIVE PROJECTS"
          icon={<Activity size={30} />}
          iconColor="#f59e0b"
          amount="24"
          growthText="12 in progress, 12 new"
          growthType="neutral"
        />

        <KpiCard
          title="COMPLETED PROJECTS"
          icon={<CheckCircle size={30} />}
          iconColor="#10b981"
          amount="12"
          growthText="100% customer satisfaction"
          growthType="positive"
        />

        <KpiCard
          title="AVERAGE BUDGET"
          icon={<Layers size={30} />}
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

      <div className={styles.taskContainer}>
        <div className={styles.leftContainer}>
          <ProjectCard
            id="PRJ-204"
            status="NEW"
            budget="$450,000"
            title="Batcave Security Grid Upgrade"
            subtitle="Implementing state-of-the-art quantum encryption & active perimeter defense sensors."
            client="Wayne Enterprises"
            startDate="Jan 15, 2025"
            endDate="Jun 30, 2025"
          />

          <ProjectCard
            id="PRJ-108"
            status="IN PROGRESS"
            budget="$1,200,000"
            title="Arc Reactor Power Network"
            subtitle="Deploying clean fusion energy microgrids across metropolitan distribution centers."
            client="Stark Industries"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />

          <ProjectCard
            id="PRJ-094"
            budget="$150,000"
            title="Digital CMS Migration"
            subtitle="Replacing physical newsroom database with a high-performance headless CRM system."
            client="Daily Planet"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />


          <ProjectCard
            id="PRJ-094"
            budget="$150,000"
            title="Digital CMS Migration"
            subtitle="Replacing physical newsroom database with a high-performance headless CRM system."
            client="Daily Planet"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />
          <ProjectCard
            id="PRJ-094"
            budget="$150,000"
            title="Digital CMS Migration"
            subtitle="Replacing physical newsroom database with a high-performance headless CRM system."
            client="Daily Planet"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />
          <ProjectCard
            id="PRJ-094"
            budget="$150,000"
            title="Digital CMS Migration"
            subtitle="Replacing physical newsroom database with a high-performance headless CRM system."
            client="Daily Planet"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />
          <ProjectCard
            id="PRJ-094"
            budget="$150,000"
            title="Digital CMS Migration"
            subtitle="Replacing physical newsroom database with a high-performance headless CRM system."
            client="Daily Planet"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />
          <ProjectCard
            id="PRJ-094"
            budget="$150,000"
            title="Digital CMS Migration"
            subtitle="Replacing physical newsroom database with a high-performance headless CRM system."
            client="Daily Planet"
            startDate="Nov 01, 2024"
            endDate="Dec 15, 2025"
          />
        </div>

        <div className={styles.rightContainer}>
          {/* Budget Distribution Widget */}
          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>BUDGET DISTRIBUTION</h3>

            <div className={styles.budgetDistItem}>
              <div className={styles.distHeader}>
                <span>Wayne Enterprises</span>
                <span>$450k (30%)</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '30%', backgroundColor: '#4f46e5' }}></div>
              </div>
            </div>

            <div className={styles.budgetDistItem}>
              <div className={styles.distHeader}>
                <span>Stark Industries</span>
                <span>$1.2M (60%)</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '60%', backgroundColor: '#f59e0b' }}></div>
              </div>
            </div>

            <div className={styles.budgetDistItem}>
              <div className={styles.distHeader}>
                <span>Daily Planet</span>
                <span>$150k (10%)</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '10%', backgroundColor: '#10b981' }}></div>
              </div>
            </div>
          </div>

          {/* Upcoming Milestones Widget */}
          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>UPCOMING MILESTONES</h3>

            <div className={styles.milestoneItem}>
              <div className={`${styles.milestoneIcon} ${styles.yellow}`}>
                <Clock size={16} />
              </div>
              <div className={styles.milestoneContent}>
                <h4 className={styles.milestoneTitle}>Security Beta Testing</h4>
                <div className={styles.milestoneMeta}>Due in 4 days • PRJ-204</div>
              </div>
            </div>

            <div className={styles.milestoneItem}>
              <div className={`${styles.milestoneIcon} ${styles.purple}`}>
                <Box size={16} />
              </div>
              <div className={styles.milestoneContent}>
                <h4 className={styles.milestoneTitle}>Fusion Reactor Delivery</h4>
                <div className={styles.milestoneMeta}>Due in 12 days • PRJ-108</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateProjectModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
    </div>
  );
}
export default Projects;