import React, { useState } from 'react'
import './Loading.module.css'
import { CirclesWithBar } from 'react-loader-spinner'

export default function Loading() {


    return <div className="fixed h-screen top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-500 flex justify-center items-center z-[3]">

        <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />

    </div>
}
