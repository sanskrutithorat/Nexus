import { useState } from "react";
import CommonTable from "@/common/CommonTable";
import CommonModal from "@/common/CommonModal";
import CreateCustomerModal from "./CreateCustomerModal";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Download, Plus } from "lucide-react";
import { useGetCustomers, useDeleteCustomer } from "@/hooks/useCustomers";
import type { Customer as CustomerType } from "@/features/customer/customer.api";
import styles from "./Customer.module.scss";

const Customer = () => {
    const { data: customerData, isLoading, isError } = useGetCustomers();
    const deleteCustomerMutation = useDeleteCustomer();

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<CustomerType | null>(null);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDeleteClick = (customer: CustomerType) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            deleteCustomerMutation.mutate(customerToDelete.id, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCustomerToDelete(null);
                }
            });
        }
    };

    const data = customerData?.results || [];



    const columns: ColumnDef<CustomerType>[] = [
        {
            accessorKey: "name",
            header: "NAME",
            cell: ({ row }) => {
                const name = row.original.name;
                const id = row.original.id;
                const initials = name ? name.split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??";

                return (
                    <div className={styles.nameContainer}>
                        <div className={styles.avatar}>
                            {initials}
                        </div>
                        <div className={styles.textContainer}>
                            <span className={styles.nameText}>{name}</span>
                            <span className={styles.idText}>ID: CUST-{id.toString().padStart(4, '0')}</span>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "company_name",
            header: "COMPANY NAME",
            cell: ({ getValue }) => (
                <span className={styles.companyText}>{getValue() as string}</span>
            )
        },
        {
            accessorKey: "email",
            header: "EMAIL",
        },
        {
            accessorKey: "phone",
            header: "PHONE NUMBER",
            cell: ({ getValue }) => {
                const val = getValue() as string;
                if (!val) return "N/A";
                if (val.length >= 10) {
                    return `+1 (555) ${val.slice(3, 6)}-${val.slice(6, 10)}`;
                }
                return val;
            }
        },
        {
            id: "actions",
            header: "ACTIONS",
            cell: ({ row }) => (
                <div className={styles.actionsContainer}>
                    <button
                        onClick={() => console.log("Edit", row.original)}
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
        <div className={styles.customerPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>Customers Directory</h1>
                    <p className={styles.pageSubtitle}>Manage, filter, and track all corporate client relationships</p>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.exportBtn}>
                        <Download size={16} />
                        Export CSV
                    </button>
                    <button className={styles.addBtn} onClick={handleShow}>
                        <Plus size={16} />
                        Add Customer
                    </button>
                </div>
            </div>

            <div className={styles.filterRow}>
                <div className={styles.filterLeft}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Organization:</span>
                        <button className={styles.filterSelect}>
                            All Organizations
                        </button>
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Status:</span>
                        <button className={styles.filterSelect}>
                            All Statuses
                        </button>
                    </div>
                </div>
                <div className={styles.filterRight}>
                    Showing {data.length > 0 ? 1 : 0} - {data.length} of {customerData?.count || 0} customers
                </div>
            </div>

            <div className={styles.CustomerTableWrapper}>
                {isLoading ? (
                    <div>Loading customers...</div>
                ) : isError ? (
                    <div>Error loading customers.</div>
                ) : (
                    <CommonTable data={data} columns={columns} itemName="customers" pageSize={6} />
                )}
            </div>

            <CreateCustomerModal show={showModal} onHide={handleClose} />

            <CommonModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Customer"
            >
                <div className={styles.modalForm}>
                    <p style={{ fontSize: "14px", color: "#475569", marginBottom: "8px" }}>
                        Are you sure you want to delete <strong>{customerToDelete?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className={styles.modalFooter}>
                        <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </button>
                        <button className={styles.deleteConfirmBtn} onClick={handleConfirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </CommonModal>
        </div>
    );
};

export default Customer;