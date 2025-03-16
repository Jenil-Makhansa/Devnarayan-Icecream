import React, { useState } from "react";

const OrderStatusDropdown = ({ selectedStatus, onChange }) => {
  const statusOptions = [
    { label: "Pending", value: "pending", textColorClass: "text-orange-500" },
    { label: "Out For Delivery", value: "outForDelivery", textColorClass: "text-blue-500" },
    { label: "Delivered", value: "delivered", textColorClass: "text-green-500" },
  ];

  return (
    <select
      value={selectedStatus}
      onChange={onChange}
      className={`border rounded px-2 py-1 ${statusOptions.find(
        (option) => option.value === selectedStatus
      ).textColorClass}`}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default OrderStatusDropdown;
