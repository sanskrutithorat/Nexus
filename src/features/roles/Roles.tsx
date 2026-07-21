import { useState } from "react";
import CommonTable from "@/common/CommonTable";
import CommonModal from "@/common/CommonModal";
import CreateRoleModal from "./CreateRoleModal";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Download, Plus, Shield } from "lucide-react";
import { useGetRoles, useDeleteRole } from "@/hooks/useRoles";
import type { Role } from "@/features/roles/roles.api";
import styles from "./Roles.module.scss";
import modalStyles from "@/common/CommonModal.module.scss";

const Roles = () => {
    const { data: rolesData, isLoading, isError } = useGetRoles();
    const deleteRoleMutation = useDeleteRole();

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setRoleToEdit(null);
        setShowModal(true);
    };

    const handleEditClick = (role: Role) => {
        setRoleToEdit(role);
        setShowModal(true);
    };

    const handleDeleteClick = (role: Role) => {
        setRoleToDelete(role);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (roleToDelete) {
            deleteRoleMutation.mutate(roleToDelete.id, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setRoleToDelete(null);
                }
            });
        }
    };

    const data = rolesData || [];

    const columns: ColumnDef<Role>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ getValue }) => (
                <span className={styles.idText}>ROLE-{getValue()?.toString().padStart(4, '0')}</span>
            )
        },
        {
            accessorKey: "name",
            header: "ROLE NAME",
            cell: ({ row }) => {
                const name = row.original.name || "Unknown";
                return (
                    <div className={styles.nameContainer}>
                        <div className={styles.avatar} style={{ background: "var(--bg-blue-light)", color: "var(--text-blue)" }}>
                            <Shield size={16} />
                        </div>
                        <div className={styles.textContainer}>
                            <span className={styles.nameText}>{name}</span>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "permissions",
            header: "PERMISSIONS",
            cell: ({ row }) => {
                const perms = row.original.permissions || {};
                const keys = Object.keys(perms);
                if (keys.length === 0) return <span style={{ color: "#64748b", fontSize: "13px", fontStyle: "italic" }}>No specific permissions</span>;

                return (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {keys.map(key => {
                            const actions = perms[key];
                            if (!actions || actions.length === 0) return null;
                            
                            const ACTIONS = ["read", "create", "update", "delete"];
                            const validActions = Array.isArray(actions) ? actions.filter((v: string) => ACTIONS.includes(v)) : actions;
                            
                            const isAll = Array.isArray(validActions) ? validActions.length === 4 : validActions === "all";
                            const actionText = isAll ? "All Access" : (Array.isArray(validActions) ? validActions.join(", ") : String(validActions));
                            return (
                                <div key={key} style={{
                                    display: "inline-flex",
                                    alignItems: "stretch",
                                    background: "rgba(30, 41, 59, 0.4)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    borderRadius: "6px",
                                    overflow: "hidden",
                                    fontSize: "12px",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                                }}>
                                    <span style={{ 
                                        padding: "4px 8px", 
                                        background: "rgba(255,255,255,0.05)", 
                                        color: "#cbd5e1", 
                                        fontWeight: 600, 
                                        textTransform: "capitalize",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        {key}
                                    </span>
                                    <span style={{ 
                                        padding: "4px 8px", 
                                        color: isAll ? "#10b981" : "#3b82f6",
                                        display: "flex",
                                        alignItems: "center",
                                        textTransform: isAll ? "none" : "capitalize"
                                    }}>
                                        {actionText}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                );
            }
        },
        {
            id: "actions",
            header: "ACTIONS",
            cell: ({ row }) => (
                <div className={styles.actionsContainer}>
                    <button
                        onClick={() => handleEditClick(row.original)}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(row.original)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.membersPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>Roles & Permissions</h1>
                    <p className={styles.pageSubtitle}>Manage access control and define roles for your organization members</p>
                </div>
                <div className={styles.headerRight}>
                    {/* <button className={styles.exportBtn}>
                        <Download size={16} />
                        Export CSV
                    </button> */}
                    <button className={styles.addBtn} onClick={handleShow}>
                        <Plus size={16} />
                        Add Role
                    </button>
                </div>
            </div>

            <div className={styles.filterRow}>
                <div className={styles.filterLeft}>
                    <h3 style={{ margin: 0, fontSize: "16px", color: "var(--text-heading)", fontWeight: 600 }}>All Roles</h3>
                </div>
                <div className={styles.filterRight}>
                    Showing {data.length > 0 ? 1 : 0} - {data.length} of {data.length} roles
                </div>
            </div>

            <div className={styles.MembersTableWrapper}>
                {isLoading ? (
                    <div>Loading roles...</div>
                ) : isError ? (
                    <div>Error loading roles.</div>
                ) : (
                    <CommonTable data={data} columns={columns} itemName="roles" pageSize={10} />
                )}
            </div>

            <CreateRoleModal show={showModal} onHide={handleClose} role={roleToEdit} />

            <CommonModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Role"
            >
                <div className={modalStyles.modalForm}>
                    <p style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
                        Are you sure you want to delete the role <strong>{roleToDelete?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className={modalStyles.modalFooter}>
                        <button className={modalStyles.cancelBtn} onClick={() => setShowDeleteModal(false)} disabled={deleteRoleMutation.isPending}>
                            Cancel
                        </button>
                        <button className={modalStyles.deleteBtn} onClick={handleConfirmDelete} disabled={deleteRoleMutation.isPending}>
                            {deleteRoleMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </CommonModal>
        </div>
    );
};

export default Roles;
