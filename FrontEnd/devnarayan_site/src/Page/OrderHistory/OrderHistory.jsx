import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './OrderHistory.scss';
import ItemsList from './ItemList';

export default function OrderHistory() {
    const { user } = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/getOrderById/${user.users._id}`);
                setOrders(res.data.orders);
                console.log(res.data.orders)
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error(error);
            }
        };

        getOrders();
    }, [user._id]); // Add user._id as a dependency

    const showOrder = orders.map((order) => {

        const isDel = order.orderDelivered;
        const isOut = order.outForDelivery;
        let initialStatus = "pending"; // Default to "Order Placed" if neither isDel nor isOut is true
        if (isDel === true) {
          initialStatus = "delivered";
        } else if (isOut === true) {
          initialStatus = "outForDelivery";
        }
        const items = order.items;
        let count = 0;
        return (
            <div key={order._id} className="singleOrder"> {/* Use a unique key */}
                <div className="orderDetails">
                    <ul>
                        <li><h5>Order ID: {order._id}</h5></li>
                        <li><h5>Date and Time: {order.createdAt}</h5></li>
                        <li><h5>Total Items: {order.items.length}</h5></li>
                        <li><h5>Price: {order.total}</h5></li>
                        <li><h5>Address: {order.hostel}</h5></li>
                        <li><h5>{initialStatus}</h5></li>
                    </ul>
                    <div className="ItemsList">
                        {
                            items.map((m) => {
                                count += 1;
                                return (
                                    <ItemsList key={m.productId} count={count} m={m} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    );

    return (
        <div>
            <Navbar />
            <Header pageTitle="My Orders" breadcrumbs={['Home', 'Order']} />
            <div className="myOrder">
                <div className="orderList">
                    <h1>Order History</h1>
                    {loading ? (
                        <p>Loading...</p> // Display loading state
                    ) : (
                        showOrder
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
