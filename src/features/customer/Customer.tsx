import { useState } from "react";
import CommonTable from "@/common/CommonTable";
import CommonModal from "@/common/CommonModal";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Download, Plus } from "lucide-react";
import styles from "./Customer.module.scss";

type User = {
    id: number;
    name: string;
    email: string;
    company: string;
    phoneNumber: string;
};

const Customer = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const data: User[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john@test.com",
            company: "Google",
            phoneNumber: "9876543210",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@test.com",
            company: "Microsoft",
            phoneNumber: "9876543211",
        },
        {
            id: 3,
            name: "Michael Johnson",
            email: "michael@test.com",
            company: "Amazon",
            phoneNumber: "9876543212",
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily@test.com",
            company: "Apple",
            phoneNumber: "9876543213",
        },
        {
            id: 5,
            name: "Chris Wilson",
            email: "chris@test.com",
            company: "Netflix",
            phoneNumber: "9876543214",
        },
        {
            id: 6,
            name: "Sophia Brown",
            email: "sophia@test.com",
            company: "Meta",
            phoneNumber: "9876543215",
        },
        {
            id: 7,
            name: "Daniel Miller",
            email: "daniel@test.com",
            company: "Adobe",
            phoneNumber: "9876543216",
        },
        {
            id: 8,
            name: "Olivia Taylor",
            email: "olivia@test.com",
            company: "Tesla",
            phoneNumber: "9876543217",
        },
        {
            id: 9,
            name: "James Anderson",
            email: "james@test.com",
            company: "IBM",
            phoneNumber: "9876543218",
        },
        {
            id: 10,
            name: "Emma Thomas",
            email: "emma@test.com",
            company: "Intel",
            phoneNumber: "9876543219",
        },
        {
            id: 11,
            name: "William Jackson",
            email: "william@test.com",
            company: "Oracle",
            phoneNumber: "9876543220",
        },
        {
            id: 12,
            name: "Ava White",
            email: "ava@test.com",
            company: "Cisco",
            phoneNumber: "9876543221",
        },
        {
            id: 13,
            name: "Benjamin Harris",
            email: "ben@test.com",
            company: "Salesforce",
            phoneNumber: "9876543222",
        },
        {
            id: 14,
            name: "Charlotte Martin",
            email: "charlotte@test.com",
            company: "Spotify",
            phoneNumber: "9876543223",
        },
        {
            id: 15,
            name: "Lucas Thompson",
            email: "lucas@test.com",
            company: "Uber",
            phoneNumber: "9876543224",
        },
        {
            id: 16,
            name: "Mia Garcia",
            email: "mia@test.com",
            company: "Airbnb",
            phoneNumber: "9876543225",
        },
        {
            id: 17,
            name: "Henry Martinez",
            email: "henry@test.com",
            company: "Twitter",
            phoneNumber: "9876543226",
        },
        {
            id: 18,
            name: "Amelia Robinson",
            email: "amelia@test.com",
            company: "PayPal",
            phoneNumber: "9876543227",
        },
        {
            id: 19,
            name: "Alexander Clark",
            email: "alex@test.com",
            company: "Dropbox",
            phoneNumber: "9876543228",
        },
        {
            id: 20,
            name: "Harper Lewis",
            email: "harper@test.com",
            company: "Slack",
            phoneNumber: "9876543229",
        },
    ];

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "NAME",
            cell: ({ row }) => {
                const name = row.original.name;
                const id = row.original.id;
                const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

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
            accessorKey: "company",
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
            accessorKey: "phoneNumber",
            header: "PHONE NUMBER",
            cell: ({ getValue }) => {
                const val = getValue() as string;
                return `+1 (555) ${val.slice(3, 6)}-${val.slice(6, 10)}`;
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
                        onClick={() => console.log("Delete", row.original)}
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
                    Showing 1 - 6 of {data.length} customers
                </div>
            </div>

            <div className={styles.CustomerTableWrapper}>
                <CommonTable data={data} columns={columns} itemName="customers" pageSize={6} />
            </div>

            <CommonModal show={showModal} onHide={handleClose} title="Add New Customer" size="lg">
                <div className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input type="text" defaultValue="Bruce Wayne" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input type="email" defaultValue="bruce@wayneenterprises.com" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input type="text" defaultValue="555-0199" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Company Name</label>
                        <input type="text" defaultValue="Wayne Enterprises" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Address</label>
                        <textarea defaultValue="1007 Mountain Drive" />
                    </div>

                    <div className={styles.modalFooter}>
                        <button className={styles.cancelBtn} onClick={handleClose}>
                            Cancel
                        </button>
                        <button className={styles.saveBtn} onClick={handleClose}>
                            Save Customer
                        </button>
                    </div>
                </div>
            </CommonModal>
        </div>
    );
};

export default Customer;