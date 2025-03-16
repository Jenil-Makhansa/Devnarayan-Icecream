import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './OrderDetails.scss';

function OrderItem({ count, m }) {
    const [product , setProduct ] = useState({});
    useEffect(()=>{
        const getProduct = async (m) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/icecream/ice/${m.icecream}`);
                setProduct(res.data);
                // console.log(res.data);
                return res.data;
            } catch (err) {
                console.log(err)
            }
        }
        getProduct(m);
    },[])
    const totalPrice = product.price * m.quantity;


    return (
        <>
            {count > 1 && <hr />}
            <div className="ord-product flex justify-start flex-row items-center">
                <img className="w-20 h-20 mx-4" src={product.image} alt="Ice-ceream" />
                <div className="product-det min-w-full flex flex-row justify-between items-center">
                    <div className="ord-product-details">
                        <h4>{product.name}</h4>
                    </div>
                    <span className="price">
                        <h5>{product.price}</h5>
                        <h5>{m.quantity}</h5>
                        <h5>{totalPrice}</h5>
                    </span>
                </div>
            </div>
        </>
    )
}

export default OrderItem