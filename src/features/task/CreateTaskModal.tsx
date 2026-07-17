import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CommonModal from '@/common/CommonModal';
import { useGetProjects } from '@/hooks/useProjects';
import { useGetUsers } from '@/hooks/useUsers';
import { useCreateTask, useUpdateTask } from '@/hooks/useTasks';
import styles from '@/common/CommonModal.module.scss';
import type { Task } from './task.api';

interface CreateTaskModalProps {
  show: boolean;
  onHide: () => void;
  task?: Task;
}

interface TaskFormValues {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed";
  due_date: string;
  project: number | string;
  assigned_to: number | string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ show, onHide, task }) => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const isPending = isCreating || isUpdating;

  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects({ page: 1, page_size: 100 });
  const { data: usersData, isLoading: isLoadingUsers } = useGetUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      due_date: '',
      project: '',
      assigned_to: ''
    }
  });

  useEffect(() => {
    if (show) {
      if (task) {
        reset({
          title: task.title,
          description: task.description,
          status: task.status,
          due_date: task.due_date ? task.due_date.split('T')[0] : '',
          project: typeof task.project === 'object' && task.project !== null ? (task.project as any).id : task.project,
          assigned_to: typeof task.assigned_to === 'object' && task.assigned_to !== null ? (task.assigned_to as any).id : task.assigned_to
        });
      } else {
        reset({
          title: '',
          description: '',
          status: 'todo',
          due_date: '',
          project: '',
          assigned_to: ''
        });
      }
    }
  }, [show, task, reset]);

  const onSubmit = (data: TaskFormValues) => {
    const { assigned_to, project, ...restData } = data;
    const payload: Partial<Task> = {
      ...restData,
      project: Number(project),
    };

    if (assigned_to) {
      payload.assigned_to = Number(assigned_to);
    }

    if (task) {
      updateTask({ id: task.id, data: payload }, {
        onSuccess: () => {
          onHide();
        },
        onError: (error) => {
          console.error("Failed to update task:", error);
        }
      });
    } else {
      createTask(payload, {
        onSuccess: () => {
          onHide();
        },
        onError: (error) => {
          console.error("Failed to create task:", error);
        }
      });
    }
  };

  return (
    <CommonModal show={show} onHide={onHide} title={task ? "Edit Task" : "Create New Task"} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
        <div className={styles.formGroup}>
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span className={styles.errorText}>{errors.title.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            rows={4}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <span className={styles.errorText}>{errors.description.message}</span>}
        </div>

        <div className={styles.formRow} style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Status</label>
            <select {...register('status', { required: 'Status is required' })}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Due Date</label>
            <input
              type="date"
              {...register('due_date')}
            />
          </div>
        </div>

        <div className={styles.formGroup} style={{ marginTop: '16px' }}>
          <label>Project</label>
          <select {...register('project', { required: 'Project is required' })}>
            <option value="">Select a Project</option>
            {isLoadingProjects ? (
              <option disabled>Loading projects...</option>
            ) : (
              projectsData?.results?.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))
            )}
          </select>
          {errors.project && <span className={styles.errorText}>{errors.project.message}</span>}
        </div>

        <div className={styles.formGroup} style={{ marginTop: '16px' }}>
          <label>Assign To (Optional)</label>
          <select {...register('assigned_to')}>
            <option value="">Unassigned</option>
            {isLoadingUsers ? (
              <option disabled>Loading users...</option>
            ) : (
              usersData?.results?.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.username} ({u.email})
                </option>
              ))
            )}
          </select>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onHide} disabled={isPending}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn} disabled={isPending}>
            {isPending ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
          </button>
        </div>
      </form>
    </CommonModal>
  );
};

export default CreateTaskModal;
