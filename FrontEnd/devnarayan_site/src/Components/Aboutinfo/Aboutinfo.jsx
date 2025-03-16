import React from 'react'
import about1 from "../../assets/Images/about.jpg"
import './Aboutinfo.scss'


export default function Aboutinfo() {
    return (
        <div className='aboutinfo'>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <h1 className="section-title position-relative text-center mb-5">Traditional & Delicious Ice Cream Since 1950</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 py-5">
                            <h4 className="font-weight-bold mb-3">About Us</h4>
                            <h5 className="text-muted mb-3">Eos kasd eos dolor vero vero, lorem stet diam rebum. Ipsum amet sed vero dolor sea</h5>
                            <p>Takimata sed vero vero no sit sed, justo clita duo no duo amet et, nonumy kasd sed dolor eos diam lorem eirmod. Amet sit amet amet no. Est nonumy sed labore eirmod sit magna. Erat at est justo sit ut. Labor diam sed ipsum et eirmod</p>
                            <a href="" className="btn btn-secondary mt-2">Learn More</a>
                        </div>
                        <div className="col-lg-4" style={{ minHeight: "400px" }}>
                            <div className="position-relative h-100 rounded overflow-hidden">
                                <img className="position-absolute w-100 h-100" src={about1} style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                        <div className="col-lg-4 py-5">
                            <h4 className="font-weight-bold mb-3">Our Features</h4>
                            <p>Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est dolor</p>
                            <h5 className="text-muted mb-3"><i className="fa fa-check text-secondary mr-3"></i>Eos kasd eos dolor</h5>
                            <h5 className="text-muted mb-3"><i className="fa fa-check text-secondary mr-3"></i>Eos kasd eos dolor</h5>
                            <h5 className="text-muted mb-3"><i className="fa fa-check text-secondary mr-3"></i>Eos kasd eos dolor</h5>
                            <a href="" className="btn btn-primary mt-2">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}