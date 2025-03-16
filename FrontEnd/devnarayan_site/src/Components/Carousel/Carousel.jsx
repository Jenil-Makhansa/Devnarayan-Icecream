import React from 'react'
import img1 from '../../assets/Images/carousel-1.jpg'
import img2 from '../../assets/Images/carousel-2.jpg'
import './Carousel.scss'

export default function Carousel() {


    return (
        <div>
            <div className="container-fluid p-0 pb-5 carousel">
                <div id="header-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item w-100 active">
                            <img className="w-100 img" src={img1} alt="Image1" />
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3 box" >
                                    {/* style="max-width: 900px;"> */}
                                        <h4 className="text-white text-uppercase mb-md-3 hsmall">Traditional & Delicious</h4>
                                        <h1 className="display-3 text-white mb-md-4 hlarge">Traditional Ice Cream Since 2005</h1>
                                        <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2 button">Learn More</a>
                                    </div>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 img" src={img2} alt="Image2" />
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3 box" >
                                    {/* style="max-width: 900px;" */}
                                        <h4 className="text-white text-uppercase mb-md-3 hsmall">Traditional & Delicious</h4>
                                        <h1 className="display-3 text-white mb-md-4 hlarge">Made From Our Own Organic Milk</h1>
                                        <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2 button">Learn More</a>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                        <div className="btn btn-secondary px-0 arrow" >
                        {/* style="width: 45px; height: 45px;" */}
                            <span className="carousel-control-prev-icon  mb-n1"></span>
                        </div>
                    </a>
                    <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                        <div className="btn btn-secondary px-0 arrow" >
                        {/* style="width: 45px; height: 45px;" */}
                            <span className="carousel-control-next-icon mb-n1"></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
