import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./ItemList.scss"

function ItemsList({ count, m }) {
    const [product , setProduct ] = useState({});

    useEffect(()=>{
        const getProduct = async (m) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/icecream/ice/${m.icecream}`);
                setProduct(res.data);
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
            <div className="ord-product">
                <img src={product.image} alt="Ice-ceream" />
                <div className="product-det">
                    <div className="ord-product-details">
                        <h5>{product.name}</h5>
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

export default ItemsList;