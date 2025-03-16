import React, { useState } from 'react'
import './product.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { additem } from '../../feature/Cart/cartSlice';

export default function ProductCard({ data,scrollPosition }) {
  const img = data.image ? data.image : require("../../assets/Images/product-1.jpg");
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const UpdateCart = async () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/cart/add/${user.users._id}/${data._id}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const requestBody = {
    };

    try {
      setLoading(true);
      const response = await axios.put(apiUrl, requestBody, { headers });
      console.log(response, "From add cart function");
      dispatch(additem(response.data.cart));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const clickHandler = () => {
    if (user === null) {
      console.log("Navigate to login");
      return <Navigate to="/login" />;
    } else {
      UpdateCart();
    }
  }

  return (
    <>
      {loading && (
        // Loading overlay
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="product-item-m col-12 col-md-6 col-lg-3 py-0 px-3" style={{ transform: `translateX(-${scrollPosition}px)` , transition: 'transform 0.6s ease'}}>
        <div className="product-item d-flex flex-column align-items-center text-center bg-white  rounded">
          <div className=" py-3 price" style={{ width: "80px" }}>
            <h4 className="font-weight-bold text-white mb-0">₹{data.price}</h4>
          </div>
          <div className="position-relative rounded-circle mt-n3 mb-4 p-3 image" style={{ width: "150px", height: "150px" }}>
            <img className="rounded-circle w-100 h-100" src={img} style={{ objectFit: "cover" }} alt='ImageOfIceCream' />
          </div>
          <h5 className="font-weight-bold mb-4">{data.name}</h5>
          {/* <a href="" className="btn btn-sm btn-secondary">Order Now</a> */}
          <button className='btn btn-sm btn-secondary' onClick={clickHandler}>Add to Cart</button>
        </div>
      </div>
    </>
  )
}
