import React, { useEffect, useRef } from 'react';
import './bannercarousel.scss';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "animate.css";
// https://ik.imagekit.io/dexo68yudb/625581fdda54f874b9152a6b_shutterstock_1683847615.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1676362306320


const Bannercarousel = (props) => {

    
    return (
        <div className='bannercarousel'>
            <OwlCarousel  className='owl-theme' autoplay={true} autoplayTimeout={5000} autoplaySpeed={5000} loop nav={false} items={1}>
                {props.bannerSlides ? props.bannerSlides.map((slides, index) => {
                    return (
                        <div key={index} className="item banner-slide">
                            <div className='banner-slide-wrap'>
                                <img src={slides.img} width={"100%"} height={"100%"} alt="banner" />
                                <div className='banner-overlay'>
                                    <div className='overlay-deatils'>
                                        <h1>{slides.title}</h1>
                                        <div className="explr-btn">
                                            <a href={'/events/#' + slides.title}>Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : (
                    <div className="item banner-slide">
                        <div className='banner-slide-wrap'>
                            <img src='https://ik.imagekit.io/dexo68yudb/2514340.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1676363192139' />
                            <div className='banner-overlay'>
                                <div className='overlay-deatils'>
                                    <h1>Loading...</h1>
                                    <div className="explr-btn">
                                        <a href='#'>Explore</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </OwlCarousel>

        </div>
    )
}

export default Bannercarousel;