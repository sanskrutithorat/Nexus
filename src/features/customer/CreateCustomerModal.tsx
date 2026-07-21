import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CommonModal from "@/common/CommonModal";
import { useCreateCustomer, useUpdateCustomer } from "@/hooks/useCustomers";
import styles from "@/common/CommonModal.module.scss";
import type { Customer as CustomerType } from "@/features/customer/customer.api";

interface CreateCustomerModalProps {
    show: boolean;
    onHide: () => void;
    customer?: CustomerType | null;
}

interface CustomerFormValues {
    name: string;
    email: string;
    phone: string;
    company_name: string;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ show, onHide, customer }) => {
    const { mutate: createCustomer, isPending: isCreating } = useCreateCustomer();
    const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();
    const isPending = isCreating || isUpdating;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomerFormValues>();

    useEffect(() => {
        if (show) {
            if (customer) {
                reset({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    company_name: customer.company_name || ""
                });
            } else {
                reset({
                    name: "",
                    email: "",
                    phone: "",
                    company_name: ""
                });
            }
        } else {
            reset({
                name: "",
                email: "",
                phone: "",
                company_name: ""
            });
        }
    }, [show, customer, reset]);

    const onSubmit = (data: CustomerFormValues) => {
        if (customer) {
            updateCustomer({ id: customer.id, data }, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error updating customer:", error);
                    alert("Failed to update customer.");
                }
            });
        } else {
            createCustomer(data, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error creating customer:", error);
                    alert("Failed to create customer.");
                }
            });
        }
    };

    return (
        <CommonModal show={show} onHide={onHide} title={customer ? "Edit Customer" : "Add New Customer"} size="lg">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Bruce Wayne"
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        placeholder="bruce@wayneenterprises.com"
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        {...register('phone')}
                        placeholder="555-0199"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Company Name</label>
                    <input
                        type="text"
                        {...register('company_name')}
                        placeholder="Wayne Enterprises"
                    />
                </div>

                <div className={styles.modalFooter}>
                    <button type="button" className={styles.cancelBtn} onClick={onHide} disabled={isPending}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveBtn} disabled={isPending}>
                        {isPending ? "Saving..." : (customer ? "Update Customer" : "Save Customer")}
                    </button>
                </div>
            </form>
        </CommonModal>
    );
};
export default CreateCustomerModal;
