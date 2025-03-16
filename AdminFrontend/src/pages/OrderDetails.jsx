import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import './OrderDetails.scss'
import OrderItem from './OrderItem';

export default function OrderDetails({ isOpen, onClose, order }) {
    const user = order.userData;
    const ord = order._doc;
    console.log(ord);
    let count = 0;
    const Items = ord.items;
    const showProduct = Items.map((m) => {
        count += 1;
        return (
            <OrderItem key={m.iceream} count={count} m={m} />
        );
    });
    const isDel = ord.orderDelivered;
    const isOut = ord.outForDelivery;

    let initialStatus = "Order Placed"; // Default to "Order Placed" if neither isDel nor isOut is true

    if (isDel === true) {
        initialStatus = "Delivered";
    } else if (isOut === true) {
        initialStatus = "Out for Delivery";
    }

    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    console.log(selectedStatus);

    // const handleStatusChange = (event) => {
    //     const value = event.target.value;
    //     if (value === "Order Placed")
    //         onStatsChange({ num: 1, id: ord._id });
    //     else if (value === "Delivered")
    //         onStatsChange({ num: 3, id: ord._id });
    //     else
    //         onStatsChange({ num: 2, id: ord._id });
    //     setSelectedStatus(event.target.value);
    // };
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
                    <div className="modal-header">Order Details</div>
                    <div className="modal-body flex flex-row-reverse " >
                        <div className="right flex flex-col ml-36 flex-1 justify-start items-start">
                            <div>Order ID : {ord._id}</div>
                            <div>Ordered By : {user.username}</div>
                            <div>Contact No : {user.mobile_number}</div>
                            <div>Total Items : {ord.items.length}</div>
                            <div>Total Price : {ord.total}</div>
                            <div>Location : {ord.hostel}</div>
                            {/* <h2 className="text-lg font-semibold mb-2">Change Order Status</h2>
                            <div className="flex flex-col items-start justify-start space-x-4">
                                {/* Radio buttons */}
                                {/* <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="Order Placed"
                                        checked={selectedStatus === 'Order Placed'}
                                        onChange={handleStatusChange}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="text-gray-700">Order Placed</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="Out for Delivery"
                                        checked={selectedStatus === 'Out for Delivery'}
                                        onChange={handleStatusChange}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="text-gray-700">Out for Delivery</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="Delivered"
                                        checked={selectedStatus === 'Delivered'}
                                        onChange={handleStatusChange}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="text-gray-700">Delivered</span>
                                </label>
                            </div>  */}
                        </div>
                        <div className='left flex-1' >
                            <h3>Item List</h3>
                            <div className="productList">
                                <br />
                                {showProduct}
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button className="button cancel" onClick={onClose}>Cancel</button>
                        <button className="button confirm" onClick={onConfirm}>Confirm</button>
                    </div> */}
                </div>
            </div>
        </Modal>
    );
}
