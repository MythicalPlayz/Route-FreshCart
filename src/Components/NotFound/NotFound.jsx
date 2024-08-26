import React, { useState } from 'react'
import './NotFound.module.css'
import image from '../../assets/images/error.svg'
export default function NotFound() {


    return <>

        <div className="w-5/6 md:w-1/2 mx-auto flex flex-col justify-center items-center py-4">
            <img src={image} alt="Page Not Found" className="w-full" />
            <h2 className='dark:text-white'>Page Not Found</h2>
        </div>

    </>
}
