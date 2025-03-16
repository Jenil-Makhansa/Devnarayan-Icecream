import React, { useEffect, useState } from 'react';
import './Changepassword.scss';
import Img from '../Login/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../feature/User/userSlice';

export default function Changepassword() {
    const navigate = useNavigate();
    const [newpassword, setpassword] = useState("");
    const id = localStorage.getItem('id');
    console.log(id);
    const item = {newpassword , id};
    async function changePass() {
        console.log("askdajs");
        // e.preventDefault();
        try {
            console.log(item);
            let result = await fetch(`${process.env.REACT_APP_BASE_URL}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(item),
            });
            result = await result.json();
            console.log(result);
            if(result){
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="Change-card-container Change-card-body">
                <div className="Change-card">
                    <div className="Change-card-logo">
                        <img src={Img} alt="logo" />
                    </div>
                    <div className="Change-card-header">
                        <h1>Change password</h1>
                        <div>Your password has expired; please choose a new password</div>
                    </div>

                    <form className="Change-card-form" >
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">lock</span>
                            <input
                                type="password"
                                placeholder="create new password"
                                id="passwordForm"
                                autofocus=""
                                required=""
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">lock</span>
                            <input
                                type="password"
                                placeholder="confirm new password"
                                id="passwordForm"
                                required=""
                            />
                        </div>
                        <button type="button" onClick={changePass}>Change Password</button>
                    </form>
                </div>
            </div>
        </>

    );
}