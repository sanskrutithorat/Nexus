import CommonTable from "@/common/CommonTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import styles from "./Customer.module.scss";

type User = {
    id: number;
    name: string;
    email: string;
    company: string;
    phoneNumber: string;
};

const Customer = () => {
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
                return `+1 (555) ${val.slice(3,6)}-${val.slice(6,10)}`;
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
        <>
            <h1 className={styles.heading}>Customer</h1>
            <CommonTable data={data} columns={columns} />
        </>
    );
};

export default Customer;