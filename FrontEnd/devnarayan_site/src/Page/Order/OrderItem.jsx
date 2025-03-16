import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OrderItem({ count, m }) {
    const [product , setProduct ] = useState({});

    useEffect(()=>{
        const getProduct = async (m) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/icecream/ice/${m.icecream._id}`);
                setProduct(res.data);
                return res.data;
            } catch (err) {
                console.log(err)
            }
        }
        getProduct(m);
    },[])
    const totalPrice = m.icecream.price * m.quantity;


    return (
        <>
            {count > 1 && <hr />}
            <div className="ord-product">
                <img src={product.image} alt="Ice-ceream" />
                <div className="product-det">
                    <div className="ord-product-details">
                        <h4>{m.icecream.name}</h4>
                        <p>Description and bhahaha</p>
                    </div>
                    <span className="price">
                        <h5>{m.icecream.price}</h5>
                        <h5>{m.quantity}</h5>
                        <h5>{totalPrice}</h5>
                    </span>
                </div>
            </div>
        </>
    )
}

export default OrderItem