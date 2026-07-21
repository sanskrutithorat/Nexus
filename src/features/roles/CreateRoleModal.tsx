import React, { useEffect, useState } from "react";
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

const MODULES = ["customers", "projects", "tasks", "roles", "members"];
const ACTIONS = ["read", "create", "update", "delete"];

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ show, onHide, role }) => {
    const { mutate: createRole, isPending: isCreating } = useCreateRole();
    const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
    const isPending = isCreating || isUpdating;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RoleFormValues>();
    const [permissions, setPermissions] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (show) {
            if (role) {
                reset({
                    name: role.name || "",
                });
                const perms = role.permissions || {};
                const normalizedPerms: Record<string, string[]> = {};
                Object.keys(perms).forEach(key => {
                    const val = perms[key];
                    if (val === "all") {
                        normalizedPerms[key] = [...ACTIONS];
                    } else if (typeof val === "string") {
                        normalizedPerms[key] = [val];
                    } else if (Array.isArray(val)) {
                        // Filter out corrupted string spread characters and only keep valid actions
                        normalizedPerms[key] = val.filter((v: string) => ACTIONS.includes(v));
                    }
                });
                setPermissions(normalizedPerms);
            } else {
                reset({
                    name: "",
                });
                setPermissions({});
            }
        } else {
            reset();
            setPermissions({});
        }
    }, [show, role, reset]);

    const handlePermissionChange = (module: string, action: string, checked: boolean) => {
        setPermissions(prev => {
            const currentModulePerms = prev[module] || [];
            let newPerms = [];
            if (checked) {
                newPerms = [...currentModulePerms, action];
            } else {
                newPerms = currentModulePerms.filter(a => a !== action);
            }
            
            const newPermissions = { ...prev };
            if (newPerms.length > 0) {
                newPermissions[module] = newPerms;
            } else {
                delete newPermissions[module];
            }
            return newPermissions;
        });
    };

    const onSubmit = (data: RoleFormValues) => {
        const payload = { ...data, permissions };
        
        if (role) {
            updateRole({ id: role.id, data: payload }, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error updating role:", error);
                    alert("Failed to update role.");
                }
            });
        } else {
            createRole(payload, {
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
                
                <div className={styles.formGroup} style={{ marginTop: "20px" }}>
                    <label style={{ marginBottom: "16px", display: "block", fontWeight: 600, fontSize: "14px" }}>Permissions</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", background: "rgba(15, 23, 42, 0.4)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        {MODULES.map(module => (
                            <div key={module} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                                <span style={{ textTransform: "capitalize", fontSize: "14px", fontWeight: 600, color: "#cbd5e1", minWidth: "100px" }}>
                                    {module}
                                </span>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", flex: 1 }}>
                                    {ACTIONS.map(action => {
                                        const isChecked = (permissions[module] || []).includes(action);
                                        return (
                                            <button
                                                key={`${module}-${action}`}
                                                type="button"
                                                onClick={() => handlePermissionChange(module, action, !isChecked)}
                                                style={{
                                                    padding: "6px 14px",
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    cursor: "pointer",
                                                    border: isChecked ? "1px solid rgba(59, 130, 246, 0.5)" : "1px solid rgba(255,255,255,0.1)",
                                                    background: isChecked ? "rgba(59, 130, 246, 0.15)" : "transparent",
                                                    color: isChecked ? "#60a5fa" : "#94a3b8",
                                                    transition: "all 0.2s ease",
                                                    textTransform: "capitalize",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                {action}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className={styles.modalFooter} style={{ marginTop: "24px" }}>
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
