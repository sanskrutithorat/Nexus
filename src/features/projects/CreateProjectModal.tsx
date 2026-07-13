import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CommonModal from '@/common/CommonModal';
import { useGetCustomers } from '@/hooks/useCustomers';
import styles from '@/common/CommonModal.module.scss';
import { useCreateProject, useUpdateProject } from '@/hooks/useProjects';

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
  project?: any;
}

interface ProjectFormValues {
  name: string;
  description: string;
  status: string;
  budget: string;
  start_date: string;
  end_date: string;
  customer: number | string;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ show, onHide, project }) => {
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const isPending = isCreating || isUpdating;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormValues>({
    defaultValues: {
      status: 'new'
    }
  });

  const { data: customersData, isLoading: isLoadingCustomers } = useGetCustomers();

  useEffect(() => {
    if (show) {
      if (project) {
        reset({
          name: project.name,
          description: project.description,
          status: project.status,
          budget: project.budget,
          start_date: project.start_date,
          end_date: project.end_date,
          customer: typeof project.customer === 'object' && project.customer !== null ? project.customer.id : project.customer
        });
      } else {
        reset({
          name: '',
          description: '',
          status: 'new',
          budget: '',
          start_date: '',
          end_date: '',
          customer: ''
        });
      }
    } else {
      reset({
        name: '',
        description: '',
        status: 'new',
        budget: '',
        start_date: '',
        end_date: '',
        customer: ''
      });
    }
  }, [show, project, reset]);

  const onSubmit = (data: ProjectFormValues) => {
    const payload = {
      ...data,
      customer: Number(data.customer)
    };

    if (project) {
      updateProject({ id: project.id, data: payload }, {
        onSuccess: () => {
          onHide();
        },
        onError: (error) => {
          console.error("Failed to update project:", error);
        }
      });
    } else {
      createProject(payload, {
        onSuccess: () => {
          onHide();
        },
        onError: (error) => {
          console.error("Failed to create project:", error);
        }
      });
    }
  };

  return (
    <CommonModal show={show} onHide={onHide} title={project ? "Edit Project" : "Create New Project"} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
        <div className={styles.formGroup}>
          <label>Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            rows={3}
            placeholder="Enter description"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <span className={styles.errorText}>{errors.description.message}</span>}
        </div>

        <div className="row">
          <div className={`col-md-6 ${styles.formGroup}`}>
            <label>Status</label>
            <select {...register('status', { required: 'Status is required' })}>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
            {errors.status && <span className={styles.errorText}>{errors.status.message}</span>}
          </div>

          <div className={`col-md-6 ${styles.formGroup}`}>
            <label>Budget</label>
            <input
              type="text"
              placeholder="e.g. 150000"
              {...register('budget', { required: 'Budget is required' })}
            />
            {errors.budget && <span className={styles.errorText}>{errors.budget.message}</span>}
          </div>
        </div>

        <div className="row" style={{ marginTop: '16px' }}>
          <div className={`col-md-6 ${styles.formGroup}`}>
            <label>Start Date</label>
            <input
              type="date"
              {...register('start_date', { required: 'Start date is required' })}
            />
            {errors.start_date && <span className={styles.errorText}>{errors.start_date.message}</span>}
          </div>

          <div className={`col-md-6 ${styles.formGroup}`}>
            <label>End Date</label>
            <input
              type="date"
              {...register('end_date', { required: 'End date is required' })}
            />
            {errors.end_date && <span className={styles.errorText}>{errors.end_date.message}</span>}
          </div>
        </div>

        <div className={styles.formGroup} style={{ marginTop: '16px' }}>
          <label>Customer</label>
          <select
            {...register('customer', {
              required: 'Customer is required',
              valueAsNumber: true
            })}
          >
            <option value="">Select a customer</option>
            {isLoadingCustomers ? (
              <option disabled>Loading customers...</option>
            ) : (
              customersData?.results?.map((customer: any) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} {customer.company_name ? `(${customer.company_name})` : ''}
                </option>
              ))
            )}
          </select>
          {errors.customer && <span className={styles.errorText}>{errors.customer.message}</span>}
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onHide} disabled={isPending}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn} disabled={isPending}>
            {isPending ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
          </button>
        </div>
      </form>
    </CommonModal>
  );
};

export default CreateProjectModal;
