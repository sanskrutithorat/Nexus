import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonModal from "@/common/CommonModal";
import { useCreateUser, useUpdateUser } from "@/hooks/useUsers";
import { useGetRoles } from "@/hooks/useRoles";
import styles from "@/common/CommonModal.module.scss";
import type { User } from "@/features/users/users.api";
import { Eye, EyeOff } from "lucide-react";

interface CreateMemberModalProps {
    show: boolean;
    onHide: () => void;
    member?: User | null;
}

interface MemberFormValues {
    username: string;
    email: string;
    password?: string;
    role_id?: string | number;
    is_active?: string | boolean;
}

const CreateMemberModal: React.FC<CreateMemberModalProps> = ({ show, onHide, member }) => {
    const { mutate: createMember, isPending: isCreating } = useCreateUser();
    const { mutate: updateMember, isPending: isUpdating } = useUpdateUser();
    const { data: roles } = useGetRoles();
    const isPending = isCreating || isUpdating;
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<MemberFormValues>();

    useEffect(() => {
        if (show) {
            setShowPassword(false);
            // Find role ID from role name if editing
            let currentRoleId = "";
            if (member?.role && roles) {
                const found = roles.find(r => r.name.toLowerCase() === member.role?.toLowerCase());
                if (found) currentRoleId = found.id.toString();
            }

            if (member) {
                reset({
                    username: member.username || "",
                    email: member.email || "",
                    role_id: currentRoleId,
                    is_active: member.is_active ? "true" : "false",
                });
            } else {
                reset({
                    username: "",
                    email: "",
                    password: "Pass@123",
                    role_id: "",
                    is_active: "true",
                });
            }
        } else {
            reset();
            setShowPassword(false);
        }
    }, [show, member, reset, roles]);

    const onSubmit = (data: MemberFormValues) => {
        const submissionData: Partial<User> = {
            username: data.username,
            email: data.email,
            is_active: data.is_active === "true",
        };

        if (data.role_id) {
            submissionData.role_id = Number(data.role_id);
        }

        if (data.password && data.password.trim() !== "") {
            submissionData.password = data.password;
        }

        if (member) {
            updateMember({ id: member.id, data: submissionData }, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error updating member:", error);
                    alert("Failed to update member.");
                }
            });
        } else {
            createMember(submissionData, {
                onSuccess: () => {
                    onHide();
                },
                onError: (error) => {
                    console.error("Error creating member:", error);
                    alert("Failed to create member.");
                }
            });
        }
    };

    return (
        <CommonModal show={show} onHide={onHide} title={member ? "Edit Member" : "Add New Member"} size="lg">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm} autoComplete="off">
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('username', { required: 'Username is required' })}
                        placeholder="john_doe"
                    />
                    {errors.username && <span className={styles.errorText}>{errors.username.message}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        autoComplete="off"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Password {member && <span style={{fontSize: "0.8em", color: "#666"}}>(Leave blank to keep current)</span>}</label>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            style={{ width: "100%", paddingRight: "40px" }}
                            {...register('password', {
                                required: !member ? 'Password is required for new members' : false
                            })}
                            placeholder={member ? "New password (optional)" : "Enter password"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Role</label>
                    <select {...register('role_id', { required: 'Role is required' })}>
                        <option value="">Select a role...</option>
                        {roles?.map((r) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                    {errors.role_id && <span className={styles.errorText}>{errors.role_id.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>Active Status</label>
                    <select {...register('is_active')}>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                
                <div className={styles.modalFooter}>
                    <button type="button" className={styles.cancelBtn} onClick={onHide} disabled={isPending}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveBtn} disabled={isPending}>
                        {isPending ? "Saving..." : (member ? "Update Member" : "Save Member")}
                    </button>
                </div>
            </form>
        </CommonModal>
    );
};
export default CreateMemberModal;
