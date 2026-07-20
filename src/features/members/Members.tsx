import { useState } from "react";
import CommonTable from "@/common/CommonTable";
import CommonModal from "@/common/CommonModal";
import CreateMemberModal from "./CreateMemberModal";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Download, Plus } from "lucide-react";
import { useGetUsers, useDeleteUser } from "@/hooks/useUsers";
import { useGetRoles } from "@/hooks/useRoles";
import { useDebounce } from "@/hooks/useDebounce";
import type { User } from "@/features/users/users.api";
import styles from "./Members.module.scss";
import modalStyles from "@/common/CommonModal.module.scss";

const Members = () => {
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [roleFilter, setRoleFilter] = useState<string>('');
    const debouncedSearch = useDebounce(searchFilter, 500);

    const { data: usersData, isLoading, isError } = useGetUsers({
        search: debouncedSearch ? debouncedSearch : undefined,
        role: roleFilter ? roleFilter : undefined,
    });
    const { data: rolesData } = useGetRoles();
    
    const deleteUserMutation = useDeleteUser();

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<User | null>(null);
    const [memberToEdit, setMemberToEdit] = useState<User | null>(null);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setMemberToEdit(null);
        setShowModal(true);
    };

    const handleEditClick = (user: User) => {
        setMemberToEdit(user);
        setShowModal(true);
    };

    const handleDeleteClick = (user: User) => {
        setMemberToDelete(user);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (memberToDelete) {
            deleteUserMutation.mutate(memberToDelete.id, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setMemberToDelete(null);
                }
            });
        }
    };

    const data = usersData?.results || [];

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "username",
            header: "NAME",
            cell: ({ row }) => {
                const username = row.original.username || "Unknown";
                const id = row.original.id;
                const initials = username.split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2);

                return (
                    <div className={styles.nameContainer}>
                        <div className={styles.avatar}>
                            {initials || "??"}
                        </div>
                        <div className={styles.textContainer}>
                            <span className={styles.nameText}>{username}</span>
                            <span className={styles.idText}>ID: MEM-{id.toString().padStart(4, '0')}</span>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "email",
            header: "EMAIL",
            cell: ({ getValue }) => (
                <span className={styles.companyText}>{getValue() as string}</span>
            )
        },
        {
            accessorKey: "role",
            header: "ROLE",
            cell: ({ getValue }) => (
                <span className={styles.companyText}>{(getValue() as string) || "N/A"}</span>
            )
        },
        {
            accessorKey: "is_active",
            header: "STATUS",
            cell: ({ getValue }) => {
                const isActive = getValue() as boolean;
                return (
                    <span className={`${styles.statusBadge} ${isActive ? styles.active : styles.inactive}`}>
                        {isActive ? "Active" : "Inactive"}
                    </span>
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
                    <h1 className={styles.pageTitle}>Members Directory</h1>
                    <p className={styles.pageSubtitle}>Manage, filter, and track all team members and users</p>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.exportBtn}>
                        <Download size={16} />
                        Export CSV
                    </button>
                    <button className={styles.addBtn} onClick={handleShow}>
                        <Plus size={16} />
                        Add Member
                    </button>
                </div>
            </div>

            <div className={styles.filterRow}>
                <div className={styles.filterLeft}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Search:</span>
                        <input 
                            type="text"
                            className={styles.filterSelect}
                            placeholder="Name or Email"
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            style={{ width: '150px' }}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Role:</span>
                        <select 
                            className={styles.filterSelect}
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            {rolesData?.map((role) => (
                                <option key={role.id} value={role.name.toLowerCase()}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.filterRight}>
                    Showing {data.length > 0 ? 1 : 0} - {data.length} of {usersData?.count || 0} members
                </div>
            </div>

            <div className={styles.MembersTableWrapper}>
                {isLoading ? (
                    <div>Loading members...</div>
                ) : isError ? (
                    <div>Error loading members.</div>
                ) : (
                    <CommonTable data={data} columns={columns} itemName="members" pageSize={6} />
                )}
            </div>

            <CreateMemberModal show={showModal} onHide={handleClose} member={memberToEdit} />

            <CommonModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Member"
            >
                <div className={modalStyles.modalForm}>
                    <p style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
                        Are you sure you want to delete <strong>{memberToDelete?.username}</strong>? This action cannot be undone.
                    </p>
                    <div className={modalStyles.modalFooter}>
                        <button className={modalStyles.cancelBtn} onClick={() => setShowDeleteModal(false)} disabled={deleteUserMutation.isPending}>
                            Cancel
                        </button>
                        <button className={modalStyles.deleteBtn} onClick={handleConfirmDelete} disabled={deleteUserMutation.isPending}>
                            {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </CommonModal>
        </div>
    );
};

export default Members;