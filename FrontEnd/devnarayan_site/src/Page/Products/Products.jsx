import axios from 'axios';
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import './Products.scss'
import ProductCard from '../../Components/Product/ProductCard';
import '../../Components/Product/product.scss'
import { Oval } from 'react-loader-spinner'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header';

export default function Products() {

    const URL = `${process.env.REACT_APP_BASE_URL}/icecream/allice`;
    const location = useLocation();
    const [product, setProduct] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fechData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(URL);
                setProduct(res.data);
            } catch (err) {
                console.log('Error to fech Data');
            } finally {
                setIsLoading(false);
            }
        }
        fechData();
    }, [])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('type');
        const filterData = !type ? product : product.filter(item => item.type === type);
        setFilterData(filterData);
    }, [location, product]);

    const fdata = filterData ? filterData : product;
    const ShowProduct = fdata.map((p) => {
        return (
            <ProductCard data={p} key={p._id} />
        )
    })

    return (
        <>
            <Navbar />
            <Header pageTitle="Products" breadcrumbs={['Home', 'Products']} />
            <div className='products'>
                <div className='aboutinfo'>
                    <div className="container-fluid py-2">
                        <div className="container py-2">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <h1 className="section-title position-relative text-center mb-5">Best Prices We Offer For Ice Cream Lovers</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filters">
                    <nav>
                        <NavLink to={"/products"}  >All</NavLink>
                        <NavLink to={"/products?type=faluda"}> Faluda</NavLink>
                        <NavLink to={"/products?type=lassi"} > Lassi</NavLink>
                        <NavLink to={"/products?type=mojito"}> Mojito</NavLink>
                        <NavLink to={"/products?type=thickshake"}> Thick Shake</NavLink>
                        <NavLink to={"/products?type=shake"}> Shake</NavLink>
                        <NavLink to={"/products?type=float"}> FLOAT</NavLink>
                        <NavLink to={"/products?type=coffee"}> Coald Coffe</NavLink>
                        <NavLink to={"/products?type=scoop"}> Scoop Ice Cream</NavLink>
                        <NavLink to={"/products?type=seasonal"}> Seasonal Ice Cream</NavLink>
                        <NavLink to={"/products?type=brownie"}> Brownie Ice Cream</NavLink>
                    </nav>
                </div>
                <div className="row owl-carousel product-carousel" >
                    {
                        isLoading ?
                            <div className="loading">
                                <Oval
                                    height={80}
                                    width={80}
                                    color="#f94fee"
                                    wrapperStyle={{}}
                                    wrapperclassName=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#f94fee"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}
                                />
                            </div>
                            : ShowProduct
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}