import React, { useEffect, useState } from 'react'
import './Brands.module.css'
import Loading from '../Loading/Loading';
import axios from 'axios';
import useBrands from '../../Hooks/useBrands';

export default function Brands() {

    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState(null);

    
    let {data, isLoading, isFetching, isError, error} = useBrands();

    async function focusFun(image,name,slug) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setFocus({image,name,slug});
        setLoading(false);
    }

    function unfocus(){
        setFocus(null);
    }

    useEffect(() => {
        document.title = 'FreshCart: Brands';
    }, [])

    return <>

        {(loading || isLoading) && <Loading />}
        <div className="p-4">
            <h1 className="text-3xl py-4 dark:text-white">Brands</h1>
            <div className="flex flex-col md:flex-row items-baseline flex-wrap space-y-2">
                {data?.map((brand, index) =>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-4" key={index}>
                        <div className='flex-flex-col transition-all rounded-md shadow-none hover:shadow-md border-[1px] border-opacity-25 border-slate-500 hover:shadow-green-500 w-full overflow-hidden cursor-pointer' onClick={() => { focusFun(brand.image,brand.name,brand.slug)}}>
                            <div className="w-full bg-white">
                                <img src={brand.image} alt={brand.name} className='w-full h-[300px] object-contain' />
                            </div>
                            <h3 className='w-full text-center text-2xl py-4 text-green-500 font-medium'>{brand.name}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {focus &&
            <div className="fixed top-0 bottom-0 left-0 right-0  bg-opacity-50 bg-gray-500 justify-center z-[3]">
                <div className='mx-auto mt-36 w-full md:w-1/4 bg-white dark:bg-gray-700 rounded-md border-[1px] border-slate-500 p-4'>
                    <i className='fas fa-2x fa-x dark:text-white text-end w-full cursor-pointer' onClick={unfocus}></i>
                    <div className='flex justify-between items-center w-full my-4 px-4 py-8 border-y-2 border-slate-500'>
                        <div>
                            <h3 className='text-green-500 text-3xl'>{focus.name}</h3>
                            <p className='dark:text-white'>{focus.slug}</p>
                        </div>
                        <div className='rounded-md bg-white overflow-hidden w-1/2'>
                            <img src={focus.image} alt={focus.name} className='w-full object-contain' />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className='bg-gray-500 p-2 text-white rounded-md' onClick={unfocus}>Close</button>
                    </div>
                </div>
            </div>
        }

    </>
}
