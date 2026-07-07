import React, { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import styles from "./CommonModal.module.scss";

type CommonModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    children: ReactNode;
    size?: "sm" | "lg" | "xl";
    className?: string;
};

const CommonModal = ({ show, onHide, title, children, size, className = "" }: CommonModalProps) => {
    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered 
            size={size}
            className={`${styles.commonModal} ${className}`}
        >
            <Modal.Header className="border-0 pb-0" closeButton>
                <Modal.Title className={styles.modalTitle}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default CommonModal;
