import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './PriceModal.scss';

export default function OrderLimitModal({ isOpen, onClose }) {
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
                    <div className="modal-header">Order Limit</div>
                    <div className="modal-body">Order needs to be more than 200.</div>
                    <div className="modal-footer">
                        <button className="button ok" onClick={onClose}>OK</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
