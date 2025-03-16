import React, { useEffect, useRef, useState } from 'react'
import './Navbar.scss'
import { Link, NavLink } from 'react-router-dom'
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart/cart';
import { Avatar } from '@mui/material';
import { logOut } from '../../feature/User/userSlice';

function stringToColor(string) {
   let hash = 0;
   let i;

   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }

   let color = '#';

   for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */

   return color;
}

function stringAvatar(name) {
   return {
      sx: {
         bgcolor: stringToColor(name),
      },
      children: name[0]
   };
}

export default function Navbar() {

   const { amount } = useSelector(state => state.cart)
   const [isOpen, setIsOpen] = useState(false);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const { user } = useSelector(state => state.user);
   // const user = user.users;
   // console.log(user);
   const dispatch = useDispatch();
   const cartRef = useRef();

   useEffect(() => {
      // Function to update the window width in state
      const updateWindowWidth = () => {
         setWindowWidth(window.innerWidth);
         // Close the cart when the window size changes
         setIsOpen(false);
      };

      // Add event listener for window resize
      window.addEventListener('resize', updateWindowWidth);

      // Clean up the event listener when the component unmounts
      return () => {
         window.removeEventListener('resize', updateWindowWidth);
      };
   }, []);

   const cartHandler = () => {
      setIsOpen(!isOpen);
   }


   const handleLogOut = () => {
      dispatch(logOut());
      localStorage.removeItem('user');
   }

   // useEffect(() => {
   //   const handleOutsideClick = (event) => {
   //     if (isOpen && cartRef.current && !cartRef.current.contains(event.target)) {
   //       cartHandler();
   //     }
   //   };

   //   if (isOpen) {
   //     document.addEventListener('click', handleOutsideClick);
   //   }

   //   return () => {
   //     document.removeEventListener('click', handleOutsideClick);
   //   };
   // }, [isOpen, cartHandler]); 

   return (
      <>
         <div className="container-fluid py-3 d-none d-md-block section">
            <div className="container">
               <div className="row">
                  <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                     <div className="d-inline-flex align-items-center">
                        {/* eslint-disable-next-line */}
                        <a className="text-white pr-3" href="" >FAQs</a>
                        <span className="text-white px-3">|</span>
                        {/*  eslint-disable-next-line */}
                        <a className="text-white " href="">Help</a>
                        <span className="text-white px-3">|</span>
                        {/* eslint-disable-next-line */}
                        <a className="text-white pl-3" href="">Support</a>
                     </div>
                  </div>
                  <div className="col-md-6 text-center text-lg-right">
                     <div className="d-inline-flex align-items-right ">
                        {/* eslint-disable-next-line */}
                        <a className="text-white px-3" href="">
                           <i className="fab fa-facebook-f"></i>
                        </a>
                        {/* eslint-disable-next-line */}
                        <a className="text-white px-3" href="">
                           <i className="fab fa-twitter"></i>
                        </a>
                        {/* eslint-disable-next-line */}
                        <a className="text-white px-3" href="">
                           <i className="fab fa-linkedin-in"></i>
                        </a>
                        {/* eslint-disable-next-line */}
                        <a className="text-white px-3" href="">
                           <i className="fab fa-instagram"></i>
                        </a>
                        {/* eslint-disable-next-line */}
                        <a className="text-white px-3" href="">
                           <i className="fab fa-youtube"></i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container-fluid position-relative nav-bar p-0 navbar_con">
            {/* eslint-disable-next-line */}
            <div className="container-lg position-relative p-0 px-lg-3">
               <nav className="navbar navbar-expand-lg bg-white navbar-light shadow p-lg-0">
                  {/* <a href="index.html" > */}
                  <Link to="/" className="navbar-brand d-block d-lg-none">
                     <h1 className="m-0 display-4 text-primary"><span className="text-secondary">DEV</span>NARAYAN</h1>
                  </Link>
                  {/* </a> */}
                  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                     <span className="navbar-toggler-icon">

                     </span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-around" id="navbarCollapse">
                     <div className="navbar-nav ml-auto py-0">
                        <NavLink to="/" className="nav-item nav-link" style={({ isActive }) => ({
                           color: isActive ? '#F195B2' : '#77777'
                        })}>Home</NavLink>
                        <NavLink to="/about" className="nav-item nav-link" style={({ isActive }) => ({
                           color: isActive ? '#F195B2' : '#77777'
                        })}>About</NavLink>
                        <NavLink to="/products" className="nav-item nav-link" style={({ isActive }) => ({
                           color: isActive ? '#F195B2' : '#77777'
                        })}>Product</NavLink>
                     </div>
                     <NavLink to="/" className="navbar-brand mx-5 d-none d-lg-block">
                        <h1 className="m-0 display-4 text-primary"><span className="text-secondary">DEV</span>NARAYAN</h1>
                     </NavLink>
                     <div className="navbar-nav mr-auto py-0 login-nav">
                        {user === null && <>
                           <Link className='link' to="/login">Login</Link>
                           <Link className='link' to="/Signup">SingUp</Link>
                        </>}
                        {user && <>

                           {user.users.username && <Avatar {...stringAvatar(user.users.username)} />}
                           <li className="nav-item dropdown ">
                              <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 {user.users.username}
                              </a>
                              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                 <li><p className="dropdown-item" style={{ margin: 0 }} onClick={handleLogOut}>LogOut</p></li>
                                 <li><Link className="dropdown-item" style={{ margin: 0 }} to="/myorders">My orders</Link></li>
                              </ul>
                           </li>

                           <div className="cartIcon">
                              <ShoppingCartOutlinedIcon className="Icon" onClick={cartHandler} ref={cartRef} />
                              <span>{amount}</span>
                           </div>
                           {/* <h3 className='cart-route'>Cart</h3> */}
                        </>
                        }
                     </div>
                  </div>
               </nav>
            </div>
         </div>
         {isOpen && <Cart isOpen={isOpen}
            cartHandler={cartHandler} />
         }
      </>
   )
}