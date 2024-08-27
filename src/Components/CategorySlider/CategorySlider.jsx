import React, { useEffect, useState } from 'react'
import './CategorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';
import useCategories from '../../Hooks/useCategories';

export default function CategorySlider() {


    let {data, isLoading, isFetching, isError, error} = useCategories();

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <div className='py-4'>
            <Slider {...settings}>
                {data?.map((catergory, index) => <div key={index} className='my-6'>
                    <img className='w-full h-[250px] py-4' src={catergory.image}></img>
                    <h2 className='font-medium dark:text-white'>{catergory.name}</h2>
                </div>)}
            </Slider>
        </div>
    );
}
