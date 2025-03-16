import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './OrderConfirmationModal.scss'

export default function OrderConfirmationModal({ isOpen, onClose, onConfirm }) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="modal-container">
                <div className="modal-content">
                    <span className="close-button" onClick={onClose}>&times;</span>
                    <div className="modal-header">Confirmation</div>
                    <div className="modal-body">Are you sure you want to confirm this order?</div>
                    <div className="modal-footer">
                        <button className="button cancel" onClick={onClose}>Cancel</button>
                        <button className="button confirm" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
