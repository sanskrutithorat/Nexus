import React from "react";
import CommonModal from "@/common/CommonModal";
import styles from "./Customer.module.scss";

interface CreateCustomerModalProps {
    show: boolean;
    onHide: () => void;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ show, onHide }) => {
    return (
        <CommonModal show={show} onHide={onHide} title="Add New Customer" size="lg">
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
                    <button className={styles.cancelBtn} onClick={onHide}>
                        Cancel
                    </button>
                    <button className={styles.saveBtn} onClick={onHide}>
                        Save Customer
                    </button>
                </div>
            </div>
        </CommonModal>
    );
};

export default CreateCustomerModal;
