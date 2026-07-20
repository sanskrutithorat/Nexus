import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CommonModal from "@/common/CommonModal";
import { useCreateRole, useUpdateRole } from "@/hooks/useRoles";
import styles from "@/common/CommonModal.module.scss";
import type { Role } from "@/features/roles/roles.api";

interface CreateRoleModalProps {
    show: boolean;
    onHide: () => void;
    role?: Role | null;
}

interface RoleFormValues {
    name: string;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ show, onHide, role }) => {
    const { mutate: createRole, isPending: isCreating } = useCreateRole();
    const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
    const isPending = isCreating || isUpdating;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RoleFormValues>();

    useEffect(() => {
        if (show) {
            if (role) {
                reset({
                    name: role.name || "",
                });
            } else {
                reset({
                    name: "",
                });
            }
        } else {
            reset();
        }
    }, [show, role, reset]);

    const onSubmit = (data: RoleFormValues) => {
        if (role) {
            updateRole({ id: role.id, data }, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error updating role:", error);
                    alert("Failed to update role.");
                }
            });
        } else {
            createRole(data, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error creating role:", error);
                    alert("Failed to create role.");
                }
            });
        }
    };

    return (
        <CommonModal show={show} onHide={onHide} title={role ? "Edit Role" : "Add New Role"} size="md">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm} autoComplete="off">
                <div className={styles.formGroup}>
                    <label>Role Name</label>
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('name', { required: 'Role name is required' })}
                        placeholder="e.g. Sales Manager"
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
                </div>
                
                <div className={styles.modalFooter}>
                    <button type="button" className={styles.cancelBtn} onClick={onHide} disabled={isPending}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveBtn} disabled={isPending}>
                        {isPending ? "Saving..." : (role ? "Update Role" : "Save Role")}
                    </button>
                </div>
            </form>
        </CommonModal>
    );
};

export default CreateRoleModal;
