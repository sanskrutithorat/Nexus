import { useEffect, useState } from "react";
import { Plus, CreditCard, Activity, CheckCircle, Layers, Clock, Box } from "react-feather";
import KpiCard from "@/common/KpiCard/KpiCard";
import styles from "./Projects.module.scss";
import ProjectCard from "@/common/ProjectCard/ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import { useGetProjects } from "@/hooks/useProjects";
import { useGetCustomers } from "@/hooks/useCustomers";

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [customerFilter, setCustomerFilter] = useState<string>('');

  const { data: ProjectData, isLoading, isError } = useGetProjects({
    status: statusFilter || undefined,
    customer: customerFilter ? (customerFilter) : undefined,
  });

  const { data: customersData } = useGetCustomers();

  const data: any = ProjectData?.results || [];

  const handleShowCreate = () => {
    setProjectToEdit(null);
    setShowCreateModal(true);
  };

  const handleEditProject = (project: any) => {
    setProjectToEdit(project);
    setShowCreateModal(true);
  };

  useEffect(() => {
    console.log(data);
    console.log(isLoading)
    console.log(isError)
  }, []);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Projects Dashboard</h1>
          <p className={styles.pageSubtitle}>Monitor project deliverables, currency budgets, and timelines</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addBtn} onClick={handleShowCreate}>
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
            <span className={styles.filterLabel}>Customer:</span>
            <select 
              className={styles.filterSelect}
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
            >
              <option value="">All Customers</option>
              {customersData?.results?.map((customer: any) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} {customer.company_name ? `(${customer.company_name})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Status:</span>
            <select 
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className={styles.filterRight}>
          Showing {data.length > 0 ? 1 : 0} - {data.length} of {ProjectData?.count || 0} projects
        </div>
      </div>

      <div className={styles.taskContainer}>
        <div className={styles.leftContainer}>
          {data && data.length > 0 ? (
            data.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                status={project.status}
                budget={`$${project.budget}`}
                title={project.name}
                subtitle={project.description}
                client={project.customer.name}
                startDate={project.start_date}
                endDate={project.end_date}
                onEdit={() => handleEditProject(project)}
              />
            ))
          ) : (
            <div className={styles.noData}>
              <p>No projects found</p>
            </div>
          )}
          {/* <ProjectCard
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
          /> */}
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

      {showCreateModal && (
        <CreateProjectModal show={showCreateModal} onHide={() => setShowCreateModal(false)} project={projectToEdit} />
      )}
    </div>
  );
}
export default Projects;
