import React, { useState } from 'react'
import './RelatedProducts.module.css'
import { Link } from 'react-router-dom'

export default function RelatedProducts({ product }) {


    return <>

        <Link to={`/details/${product.id}`}>
            <div className='p-2 hover:border-2 focus:border-2 border-green-500 rounded-md'>
                <div className='py-4'>
                    <img src={product.imageCover} alt="" className='w-full' />
                </div>
                <h3 className='font-medium dark:text-white'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className='flex justify-between w-full py-4'>
                    <h3 className='font-bold text-main'>{product.price} L.E</h3>
                    <div className='flex items-center space-x-2'>
                        <i className='fa-solid fa-star text-yellow-400'></i>
                        <h3 className='dark:text-white'>{product.ratingsAverage}</h3>
                    </div>
                </div>
            </div>
        </Link>
    </>
}
