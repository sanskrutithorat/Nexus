import { useState } from "react";
import {
  Plus,
  Clock,
  ArrowLeft,
  ArrowRight,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronLeft
} from "react-feather";
import styles from "./Task.module.scss";
import type { Task as ITask } from "./task.api";
import { useGetTasks, useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useGetProjects } from "@/hooks/useProjects";
import { useGetUsers } from "@/hooks/useUsers";
import CreateTaskModal from "./CreateTaskModal";
import CommonModal from "@/common/CommonModal";
import modalStyles from "@/common/CommonModal.module.scss";

const Task = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');

  const { data, isLoading } = useGetTasks({ 
    page,
    project: projectFilter ? Number(projectFilter) : undefined,
    assigned_to: assigneeFilter ? Number(assigneeFilter) : undefined
  });
  
  const { data: projectsData } = useGetProjects({ page: 1, page_size: 100 });
  const { data: usersData } = useGetUsers();

  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const tasks = data?.results || [];
  const totalCount = data?.count || 0;

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const handleCreate = () => {
    setSelectedTask(undefined);
    setShowModal(true);
  };

  const handleEdit = (task: ITask) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = (task: ITask) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }
      });
    }
  };

  const changeStatus = (task: ITask, newStatus: "todo" | "in_progress" | "completed") => {
    updateTask({ id: task.id, data: { status: newStatus } });
  };

  const renderTaskCard = (task: ITask) => (
    <div key={task.id} className={styles.taskCard}>
      <div className={styles.cardLabels}>
        <span className={`${styles.label} ${styles.medium}`}>
          {task.project && typeof task.project === 'object' ? task.project.name : 'Task'}
        </span>
        <div className={styles.cardActions}>
          <button 
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={() => handleEdit(task)}
            title="Edit Task"
          >
            <Edit2 size={14} />
          </button>
          <button 
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => handleDelete(task)}
            title="Delete Task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <h5 className={styles.cardTitle}>{task.title}</h5>
      <p className={styles.cardDesc}>{task.description}</p>
      
      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <div className={styles.metaItem}>
            <Clock size={14} />
            <span>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "No Date"}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className={styles.statusActions}>
            {task.status !== 'todo' && (
              <button 
                title="Move to Previous Status"
                className={styles.statusBtn}
                onClick={() => changeStatus(task, task.status === 'completed' ? 'in_progress' : 'todo')}
              >
                <ChevronLeft size={14} />
              </button>
            )}
            {task.status !== 'completed' && (
              <button 
                title="Move to Next Status"
                className={styles.statusBtn}
                onClick={() => changeStatus(task, task.status === 'todo' ? 'in_progress' : 'completed')}
              >
                <ChevronRight size={14} />
              </button>
            )}
          </div>
          <div className={styles.avatar}>
            {task.assigned_to && typeof task.assigned_to === 'object' && task.assigned_to.username
              ? task.assigned_to.username.charAt(0).toUpperCase()
              : task.assigned_to
              ? `U${typeof task.assigned_to === 'object' ? task.assigned_to.id : task.assigned_to}`
              : "Un"}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.taskPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Task Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Kanban workflow tracking and task management
          </p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addBtn} onClick={handleCreate}>
            <Plus size={16} />
            Create Task
          </button>
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filterLeft}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Project:</span>
            <select 
              className={styles.filterSelect}
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="">All Projects</option>
              {projectsData?.results?.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Assignee:</span>
            <select 
              className={styles.filterSelect}
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
            >
              <option value="">All Assignees</option>
              {usersData?.results?.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.username} - {u.role || (u.is_staff ? 'Staff' : 'User')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.filterRight}>
          Showing {totalCount} active tasks
        </div>
      </div>

      {isLoading ? (
        <div style={{ padding: "20px" }}>Loading tasks...</div>
      ) : (
        <div className={styles.taskBoard}>
          {/* TODO Column */}
          <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerTitle}>
                <div className={`${styles.statusDot} ${styles.todo}`}></div>
                <h4>To Do</h4>
                <span className={styles.taskCount}>{todoTasks.length}</span>
              </div>
            </div>
            <div className={styles.taskList}>
              {todoTasks.map(renderTaskCard)}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerTitle}>
                <div
                  className={`${styles.statusDot} ${styles.inProgress}`}
                ></div>
                <h4>In Progress</h4>
                <span className={styles.taskCount}>
                  {inProgressTasks.length}
                </span>
              </div>
            </div>
            <div className={styles.taskList}>
              {inProgressTasks.map(renderTaskCard)}
            </div>
          </div>

          {/* COMPLETED Column */}
          <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
              <div className={styles.headerTitle}>
                <div className={`${styles.statusDot} ${styles.done}`}></div>
                <h4>Completed</h4>
                <span className={styles.taskCount}>{completedTasks.length}</span>
              </div>
            </div>
            <div className={styles.taskList}>
              {completedTasks.map(renderTaskCard)}
            </div>
          </div>
        </div>
      )}

      <div className={styles.paginationFooter}>
        <div className={styles.paginationInfo}>
          Total items: {totalCount}
        </div>

        <div className={styles.paginationControls}>
          <span className={styles.pageText}>Page {page}</span>
          <button
            className={styles.paginationBtn}
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            className={styles.paginationBtn}
            onClick={() => setPage(page + 1)}
            disabled={tasks.length < 30}
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <CreateTaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        task={selectedTask}
      />

      <CommonModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete Task"
      >
        <div className={modalStyles.modalForm}>
          <p style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
            Are you sure you want to delete <strong>{taskToDelete?.title}</strong>? This action cannot be undone.
          </p>
          <div className={modalStyles.modalFooter}>
            <button className={modalStyles.cancelBtn} onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Cancel
            </button>
            <button className={modalStyles.deleteBtn} onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default Task;