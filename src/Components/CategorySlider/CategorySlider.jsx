import React, { useEffect, useState } from 'react'
import './CategorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';

export default function CategorySlider() {


    const [categories, setCategories] = useState([]);

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

    async function getProductCategories() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(data.data);

        }
        catch (error) {
            toast.error(error, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(error);

        }
    }

    useEffect(() => {
        getProductCategories();
    }, [])


    return (
        <div className='py-4'>
            <Slider {...settings}>
                {categories?.map((catergory, index) => <div key={index} className='my-6'>
                    <img className='w-full h-[250px] py-4' src={catergory.image}></img>
                    <h2 className='font-medium dark:text-white'>{catergory.name}</h2>
                </div>)}
            </Slider>
        </div>
    );
}
