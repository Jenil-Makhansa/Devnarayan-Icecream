import React, { useRef, useState } from 'react'
import './Service.scss'
import img1 from '../../assets/Images/service-1.jpg'
import img2 from '../../assets/Images/service-2.jpg'
import img3 from '../../assets/Images/service-3.jpg'
import img4 from '../../assets/Images/service-4.jpg'

export default function Service() {

    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

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
            const maxScrollPosition = containerRef.current.scrollWidth - containerWidth;
            const newPosition = scrollPosition + cardWidth;
            setScrollPosition(Math.min(maxScrollPosition, newPosition));
        }
    };

    return (
        <div className="container-fluid py-5 service">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className="section-title position-relative mb-5">Best Services We Provide For Our Clients</h1>
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
                            <h5 className="font-weight-semi-bold mt-5 mb-3 pt-5">Quality Maintain</h5>
                            <p>Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo</p>
                            <a href="" className="border-bottom border-secondary text-decoration-none text-secondary">Learn More</a>
                        </div>
                    </div>
                    <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 " style={{ transform: `translateX(-${scrollPosition}px)` }}>
                        <div className="service-img mx-auto">
                            <img className="rounded-circle w-100 h-100 bg-light p-3" src={img2} />
                            {/* style="object-fit: cover;" */}
                        </div>
                        <div className="position-relative text-center rounded service-item-text p-4 pb-5" >
                            {/* style="margin-top: -75px;" */}
                            <h5 className="font-weight-semi-bold mt-5 mb-3 pt-5">Individual Approach</h5>
                            <p>Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo</p>
                            <a href="" className="border-bottom border-secondary text-decoration-none text-secondary">Learn More</a>
                        </div>
                    </div>
                    <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 " style={{ transform: `translateX(-${scrollPosition}px)` }}>
                        <div className="service-img mx-auto">
                            <img className="rounded-circle w-100 h-100 bg-light p-3" src={img3} />
                            {/* style="object-fit: cover;"  */}
                        </div>
                        <div className="position-relative text-center  rounded service-item-text p-4 pb-5" >
                            {/* style="margin-top: -75px;" */}
                            <h5 className="font-weight-semi-bold mt-5 mb-3 pt-5">Celebration Ice Cream</h5>
                            <p>Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo</p>
                            <a href="" className="border-bottom border-secondary text-decoration-none text-secondary">Learn More</a>
                        </div>
                    </div>
                    <div className="service-item col-12 col-sm-12 col-md-6 col-lg-4 "  style={{ transform: `translateX(-${scrollPosition}px)` }}>
                        <div className="service-img mx-auto">
                            <img className="rounded-circle w-100 h-100 bg-light p-3" src={img4} />
                            {/* style="object-fit: cover;"  */}
                        </div>
                        <div className="position-relative text-center rounded service-item-text p-4 pb-5" >
                            {/* style="margin-top: -75px;" */}
                            <h5 className="font-weight-semi-bold mt-5 mb-3 pt-5">Delivery To Any Point</h5>
                            <p>Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo</p>
                            <a href="" className="border-bottom border-secondary text-decoration-none text-secondary">Learn More</a>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}
