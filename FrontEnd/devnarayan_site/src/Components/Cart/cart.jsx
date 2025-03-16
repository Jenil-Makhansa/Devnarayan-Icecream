import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleProduct from './SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updatetotal } from '../../feature/Cart/cartSlice';
import { ClipLoader } from 'react-spinners'
import './cart.scss';

export default function Cart({ isOpen, cartHandler }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const users = user == null ? null : user.users;

    const [loading, setLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(isOpen);

    const { cartItems, total } = useSelector((store) => store.cart);

    const dispatch = useDispatch();
 

    const decreaseItem = async (prop) => {
        setLoading(true);
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/sub/${users._id}/${prop}`);
            dispatch(updatetotal(res.data.cart));
            return res.statusCode;
        }
        catch (error) {
            console.error(error);
            return error;
        }
        finally {
            setLoading(false);
        }

    }

    const increaseItem = async (prop) => {
        setLoading(true);
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/add/${users._id}/${prop}`);
            dispatch(updatetotal(res.data.cart));
            return res;
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handelCart = async () => {
        setLoading(true);
        dispatch(clearCart());
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/${users._id}/clear`);
            dispatch(updatetotal(res.data.cart));
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const showProduct = cartItems.map((item) => {
        return (
            <SingleProduct
                item={item}
                key={item._id}
                decreaseItem={decreaseItem}
                increaseItem={increaseItem}
            />
        )
    })
    return (
        <div className={`cart ${loading ? 'loading' : ''}`}>

            <>
                <div className={`spinner-container ${loading ? '' : 'd-none'} `}>
                    <ClipLoader color="#088bed" className={`${loading ? '' : 'd-none'}`} />
                </div>
                {/* <div className={`${loading ? 'disable' : ''}`}> */}
                <h1>Products in your cart</h1>

                <h6 onClick={cartHandler}>Back</h6>
                {showProduct}
                <div className="total">
                    <span>SUBTOTAL</span>
                    <span>₹{total}</span>
                </div>
                {<Link to="/order"><button>PROCEED TO CHECKOUT</button></Link>}
                <span className="reset" onClick={handelCart}>
                    Reset Cart
                </span>

                {/* </div> */}
            </>
        </div>
    )
}
