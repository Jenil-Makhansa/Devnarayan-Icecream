import React, { useEffect, useState } from 'react';
import './Change.scss';
import Img from '../Login/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../feature/User/userSlice';

export default function Change() {

    const [password, setpassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function change(e) {
        e.preventDefault();

        let userCredentials = {
            password
        }

        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                setpassword('');
                navigate('/');
            }
        })
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

                    <form className="Change-card-form">
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">lock</span>
                            <input
                                type="password"
                                placeholder="create new password"
                                id="passwordForm"
                                autofocus=""
                                required=""
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
                        <button type="submit">Change Password</button>
                    </form>
                </div>
            </div>

        </>

    );
}
