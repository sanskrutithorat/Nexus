import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CommonModal from "@/common/CommonModal";
import { useCreateCustomer } from "@/hooks/useCustomers";
import styles from "@/common/CommonModal.module.scss";

interface CreateCustomerModalProps {
    show: boolean;
    onHide: () => void;
}

interface CustomerFormValues {
    name: string;
    email: string;
    phone: string;
    company_name: string;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ show, onHide }) => {
    const { mutate: createCustomer, isPending } = useCreateCustomer();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomerFormValues>();

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    const onSubmit = (data: CustomerFormValues) => {
        createCustomer(data, {
            onSuccess: () => {
                onHide();
            },
            onError: (error) => {
                console.error("Error creating customer:", error);
                alert("Failed to create customer.");
            }
        });
    };

    return (
        <CommonModal show={show} onHide={onHide} title="Add New Customer" size="lg">
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
                        {isPending ? "Saving..." : "Save Customer"}
                    </button>
                </div>
            </form>
        </CommonModal>
    );
};

export default CreateCustomerModal;
