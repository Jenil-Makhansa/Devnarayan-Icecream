import React, { useRef, useState } from 'react'
import './Chefdetails.scss'
import img1 from '../../assets/Images/team-1.jpg'
import img2 from '../../assets/Images/team-2.jpg'
import img3 from '../../assets/Images/team-3.jpg'
import img4 from '../../assets/Images/team-4.jpg'

export default function Chefdetails() {

    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const numCards = 3;
    const scrollLeft = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('.service-item').clientWidth;
            const newPosition = scrollPosition - cardWidth;
            setScrollPosition(Math.max(0, newPosition));
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('.service-item').clientWidth;
            const containerWidth = containerRef.current.clientWidth;
            const maxScrollPosition = cardWidth * (numCards - 1);
            const newPosition = scrollPosition + cardWidth;
            setScrollPosition(newPosition >= maxScrollPosition ? 0 : newPosition);
        }
    };

    return (
        <>
            <div className="chefdetails">
                <div className="container-fluid py-5 service">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1 className="section-title position-relative mb-5">Experienced & Most Famous Ice Cream Chefs</h1>
                            </div>
                            <div className="col-lg-6 mb-md-0 mb-lg-0 pb-md-0 pb-lg-0 side_arrow">
                                <i className="fa-solid single_arrow fa-angle-left fa-xl" onClick={scrollLeft}></i>
                                <i className="fa-solid single_arrow fa-angle-right fa-xl" onClick={scrollRight}></i>

                            </div>
                        </div>
                        {/* <div className="row"> */}
                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-3 "> */}
                        <div className="owl-carousel service-carousel services row" ref={containerRef}>
                            <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 " style={{ transform: `translateX(-${scrollPosition}px)` }}>
                                <div className="service-img mx-auto">
                                    <img className="rounded-circle w-100 h-100 bg-light p-3" src={img1} />
                                    {/* style="object-fit: cover;" */}
                                </div>
                                <div className="position-relative text-center  rounded service-item-text p-4 pb-5" >
                                    {/* style="margin-top: -75px;" */}
                                    <h3 className="font-weight-semi-bold mt-5 mb-3 pt-5">Full Name</h3>
                                    <p>DESIGNATION</p>
                                    <div className="d-flex justify-content-center pt-1">
                                        <a className="btn btn-outline-secondary btn-social mx-2 " href="#"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 " style={{ transform: `translateX(-${scrollPosition}px)` }}>
                                <div className="service-img mx-auto">
                                    <img className="rounded-circle w-100 h-100 bg-light p-3" src={img2} />
                                    {/* style="object-fit: cover;" */}
                                </div>
                                <div className="position-relative text-center rounded service-item-text p-4 pb-5" >
                                    {/* style="margin-top: -75px;" */}
                                    <h3 className="font-weight-semi-bold mt-5 mb-3 pt-5">Full Name</h3>
                                    <p>DESIGNATION</p>
                                    <div className="d-flex justify-content-center pt-1">
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 " style={{ transform: `translateX(-${scrollPosition}px)` }}>
                                <div className="service-img mx-auto">
                                    <img className="rounded-circle w-100 h-100 bg-light p-3" src={img3} />
                                    {/* style="object-fit: cover;"  */}
                                </div>
                                <div className="position-relative text-center  rounded service-item-text p-4 pb-5" >
                                    {/* style="margin-top: -75px;" */}
                                    <h3 className="font-weight-semi-bold mt-5 mb-3 pt-5">Full Name</h3>
                                    <p>DESIGNATION</p>
                                    <div className="d-flex justify-content-center pt-1">
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 " style={{ transform: `translateX(-${scrollPosition}px)` }}>
                                <div className="service-img mx-auto">
                                    <img className="rounded-circle w-100 h-100 bg-light p-3" src={img4} />
                                    {/* style="object-fit: cover;"  */}
                                </div>
                                <div className="position-relative text-center rounded service-item-text p-4 pb-5 " >
                                    {/* style="margin-top: -75px;" */}
                                    <h3 className="font-weight-semi-bold mt-5 mb-3 pt-5">Full Name</h3>
                                    <p>DESIGNATION</p>
                                    <div className="d-flex justify-content-center pt-1">
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-outline-secondary btn-social mx-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div>
                </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}