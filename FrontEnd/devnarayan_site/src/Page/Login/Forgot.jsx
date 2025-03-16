import React, { useState } from 'react';
import './Forgot.scss';
import Img from '../Login/logo.png';
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
const OtpInputCard = ({ title, sendOTP, otpEnabled, ...rest }) => {
    const [OTP, setOTP] = useState("");
    const navigate = useNavigate();
    if (!otpEnabled) {
        return null; // Don't render the OTP input if otpEnabled is false
    }
    async function changePassword(){
        try {
            console.log(OTP);
            const item2 ={OTP}
            let result = await fetch(`${process.env.REACT_APP_BASE_URL}/verifyOTP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(item2),
            });
            if(result){
                result = await result.json();
                console.log(result);
                // localStorage.setItem('id',result)
                navigate('/changepassword');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div style={{ padding: 12 }}>
            <div style={{ marginBottom: 12 }}>{title}</div>
            <OTPInput value={OTP} onChange={setOTP} {...rest} />
            <button onClick={changePassword}>Verify OTP</button>
        </div>
    );
};

export default function Forgot() {
    const [otpEnabled, setOtpEnabled] = useState(false);
    const [email, setemail] = useState("");
    async function sendOnetimepassword() {
        const item = {email};
        console.log(item);
        setOtpEnabled(true);
        console.log(item);
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(item),
        });
        result = await result.json();
        console.log(result.isMatched._id);
        localStorage.setItem('id' , result.isMatched._id)
    }
    return (
        <>
            <div className="Forgot-card-body">
                <div className="Forgot-card-container">
                    <div className="Forgot-card">
                        <div className="Forgot-card-logo">
                            <img src={Img} alt="logo" />
                        </div>
                        <div className="Forgot-card-header">
                            <h1>Forgot Password</h1>
                            <div>Enter Your Email and we'll send you a link to reset your password.</div>
                        </div>
                        <form className="Forgot-card-form">
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">mail</span>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    id="emailForm"
                                    autoFocus=""
                                    required=""
                                    name="email"
                                    onChange = {(e)=>setemail(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={sendOnetimepassword}
                            >
                                Send OTP
                            </button>
                        </form>

                        <OtpInputCard
                            title="Enter OTP here"
                            otpEnabled={otpEnabled} // Pass the otpEnabled state to the component
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}