import React, { useState } from 'react';
import { useFormik } from 'formik';
import './Login.scss';
import Img from '../Login/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../feature/User/userSlice';
import { loginFormScheama } from '../../schema';

const initialValues = {
    email: "",
    password: ""
}

export default function Login() {
    const { loading, error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: loginFormScheama,
        onSubmit: async (values, action) => {
            console.log(values);
            action.resetForm();
            try {
                const response = await dispatch(loginUser(values));
                if (loginUser.fulfilled.match(response)) {
                    navigate('/');
                }
            } catch (error) {
                // Handle login error
                console.error(error);
            }
        }
    });


    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="login-card-container login-card-body">
                <div className="login-card">
                    <div className="login-card-logo">
                        <img src={Img} alt="logo" />
                    </div>
                    <div className="login-card-header">
                        <h1>Sign In</h1>
                        <div>Please login to use the platform</div>
                    </div>

                    <form className="login-card-form" onSubmit={handleSubmit}>
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">mail</span>
                            <input
                                placeholder="Enter Email"
                                id="emailForm"
                                type="text"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ marginBottom: '10px' }}
                            />
                            {errors.email && touched.email ? (<p className='alert alert-danger'>{errors.email}</p>) : null}
                        </div>
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">lock</span>
                            <input
                                placeholder="Enter Password"
                                id="passwordForm"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ marginBottom: '10px' }}
                            />
                            {errors.password && touched.password ? (<p className='alert alert-danger'>{errors.password}</p>) : null}
                        </div>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            Show Password
                        </label>
                        <Link to="/Forgot">I forgot my password!</Link>
                        <button type="submit">
                            {loading ? 'Loading...' : 'Sign in'}
                        </button>
                        {error && (
                            <div className='alert alert-danger' role='alert'>{error}</div>
                        )}
                    </form>
                    <div className="login-card-footer">
                        Don't have an account? <Link to="/Signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
