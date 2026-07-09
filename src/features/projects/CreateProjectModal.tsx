import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useGetCustomers } from '@/hooks/useCustomers';

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
}

interface ProjectFormValues {
  name: string;
  description: string;
  status: string;
  budget: string;
  start_date: string;
  end_date: string;
  customer: number;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ show, onHide }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormValues>({
    defaultValues: {
      status: 'new'
    }
  });

  const { data: customersData, isLoading: isLoadingCustomers } = useGetCustomers();

  const onSubmit = (data: ProjectFormValues) => {
    console.log("Form submitted", data);
    // TODO: Add API call to create project
    onHide();
    reset();
  };

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter project name" 
              {...register('name', { required: 'Name is required' })} 
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Enter description" 
              {...register('description', { required: 'Description is required' })} 
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Status</Form.Label>
              <Form.Select {...register('status', { required: 'Status is required' })} isInvalid={!!errors.status}>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.status?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Budget</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. 150000" 
                {...register('budget', { required: 'Budget is required' })} 
                isInvalid={!!errors.budget}
              />
              <Form.Control.Feedback type="invalid">{errors.budget?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type="date" 
                {...register('start_date', { required: 'Start date is required' })} 
                isInvalid={!!errors.start_date}
              />
              <Form.Control.Feedback type="invalid">{errors.start_date?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="date" 
                {...register('end_date', { required: 'End date is required' })} 
                isInvalid={!!errors.end_date}
              />
              <Form.Control.Feedback type="invalid">{errors.end_date?.message}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select 
              {...register('customer', { 
                required: 'Customer is required',
                valueAsNumber: true
              })} 
              isInvalid={!!errors.customer}
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
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.customer?.message}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Project
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProjectModal;
