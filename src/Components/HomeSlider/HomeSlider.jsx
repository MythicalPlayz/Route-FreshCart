import React, { useEffect, useState } from 'react'
import './HomeSlider.module.css'
import Slider from 'react-slick';
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
export default function HomeSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: false,
        arrows: false,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return <>
        <div className="py-4 w-full flex">
            <div className="w-3/4">
                <Slider {...settings}>
                    <img src={slide1} alt="" className='w-full h-[400px]' />
                    <img src={slide2} alt="" className='w-full h-[400px]' />
                    <img src={slide3} alt="" className='w-full h-[400px]' />
                </Slider>
            </div>
            <div className="w-1/4">
                <img src={slide1} alt="" className='w-full h-[200px]' />
                <img src={slide2} alt="" className='w-full h-[200px]' />
            </div>
        </div >

    </>
}
