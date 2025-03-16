import React from 'react'
import './About.scss'
import Navbar from '../../Components/Navbar/Navbar'
import Chefdetails from '../../Components/Chefdetails/Chefdetails'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Aboutinfo from '../../Components/Aboutinfo/Aboutinfo'

export default function About() {
    return (
        <>
            <Navbar />
            <Header pageTitle="About" breadcrumbs={['Home', 'About']} />
            <Aboutinfo />
            <Chefdetails />
            <Footer />
        </>
    )
}
