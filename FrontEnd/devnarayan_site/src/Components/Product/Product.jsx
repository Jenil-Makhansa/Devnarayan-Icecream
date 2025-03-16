import './product.scss'
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';


export default function Product() {

    const URL = `${process.env.REACT_APP_BASE_URL}/icecream/allice`;

    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fechData = async () => {
            try {
                const res = await axios.get(URL);
                setProduct(res.data);
            } catch (err) {
                console.log('Error to fech Data');
                console.log(err);
            }
        }

        fechData();
    }, [])

    const [scrollPosition, setScrollPosition] = useState(0);
    const ShowProduct = product.map((p) => {
        return (
            <ProductCard data={p} key={p._id} scrollPosition={scrollPosition}/>
        )
    })

    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('.product-item-m').clientWidth;
            const newPosition = scrollPosition - cardWidth;
            setScrollPosition(Math.max(0, newPosition));
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('.product-item-m').clientWidth;
            const containerWidth = containerRef.current.clientWidth;
            const maxScrollPosition = containerRef.current.scrollWidth - containerWidth;
            const newPosition = scrollPosition + cardWidth;
            setScrollPosition(Math.min(maxScrollPosition, newPosition));

        }
    };

    // const scrollLeft = () => {
    //     const container = document.querySelector('.product-carousel');
    //     const cardWidth = container.querySelector('.product-item-m').clientWidth;
    //     const newPosition = container.scrollLeft - cardWidth;
    //     container.scrollBy({ left: newPosition, behavior: 'smooth' });
    // };

    // const scrollRight = () => {
    //     const container = document.querySelector('.product-carousel');
    //     const cardWidth = container.querySelector('.product-item').clientWidth;
    //     const containerWidth = container.clientWidth;
    //     const maxScrollPosition = container.scrollWidth - containerWidth;

    //     // Calculate the number of cards in one row
    //     const cardsInRow = Math.floor(containerWidth / cardWidth);

    //     // Calculate the scroll distance to show the next card
    //     const scrollDistance = cardWidth * (cardsInRow - 1);

    //     // Calculate the new scroll position
    //     const newPosition = scrollPosition + scrollDistance;

    //     // Limit the newPosition to the maximum scroll position
    //     const clampedPosition = Math.min(newPosition, maxScrollPosition);

    //     setScrollPosition(clampedPosition);
    //     container.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    //   };



    return (
        <div className='prodect-all'>
            <div className="container-fluid py-5 product ">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <h1 className="section-title position-relative mb-5">Best Prices We Offer For Ice Cream Lovers</h1>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0 side_arrow">
                            <i className="fa-solid single_arrow fa-angle-left fa-xl" onClick={scrollLeft}></i>
                            <i className="fa-solid single_arrow fa-angle-right fa-xl" onClick={scrollRight}></i>

                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-12 ">
                            <div className="row owl-carousel product-carousel" ref={containerRef}>
                                {
                                    ShowProduct
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


