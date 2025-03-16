import './Login.scss';
import Img from '../Login/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../feature/User/signupSlice';
import { useFormik } from 'formik';
import { signupFormSchema } from '../../schema';

let initialValues = {
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    mobile_number: ""
}

export default function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: signupFormSchema,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
            dispatch(signupUser(values)).then((result) => {
                if (result.payload) {
                    navigate('/login');
                }
            })

        }
    })
    const { loading, error } = useSelector((state) => state.signup);

    return (
        <>
            <div className="login-card-container login-card-body">
                <div className="login-card">
                    <div className="login-card-logo">
                        <img src={Img} alt="logo" />
                    </div>
                    <div className="login-card-header">
                        <h1>Sign Up</h1>
                        <div>Please login to use the platform</div>
                    </div>

                    <form className="login-card-form" onSubmit={handleSubmit}>

                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">mail</span>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                id="emailForm"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (<p className='alert alert-danger'>{errors.email}</p>) : null}
                        </div>
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">Person</span>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                id="userForm"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username ? (<p className='alert alert-danger'>{errors.username}</p>) : null}

                        </div>

                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">lock</span>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                id="passwordForm"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (<p className='alert alert-danger'>{errors.password}</p>) : null}
                        </div>
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">lock</span>
                            <input
                                type="password"
                                placeholder="Enter Confirm Password"
                                id="confirmForm"
                                name="confirmpassword"
                                value={values.confirmpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirmpassword && touched.confirmpassword ? (<p className='alert alert-danger'>{errors.confirmpassword}</p>) : null}
                        </div>
                        <div className="form-item">
                            <span className="form-item-icon material-symbols-rounded">phone</span>
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                id="phoneForm"
                                name="mobile_number"
                                value={values.mobile_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>

                        <button type="submit" >{
                            loading ? 'Loading...' : 'Sign up'}
                        </button>
                        {error && (
                            <div className='alert alert-danger' role='alert'>{error}</div>
                        )}
                    </form>

                    <div className="login-card-footer">
                        Already have an account <Link to='/login'>Sign In</Link>
                    </div>
                </div>
            </div>
        </>

    );
}
