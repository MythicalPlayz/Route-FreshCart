import React, { useEffect, useState } from 'react'
import './Categories.module.css'
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function Categories() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [subCategoryName, setSubCategoryName] = useState('');

    async function getCategories() {
        setLoading(true);
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
        setLoading(false);
    }

    async function getSubCategories(id,name) {
        setLoading(true);
        setSubCategoryName(name);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
            setSubCategories(data.data);
            //console.log(data.data);
        } catch (error) {
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
        setLoading(false);
    }



    useEffect(() => {
        getCategories();
        document.title = 'FreshCart: Categories';
    }, [])

    return <>
        {loading && <Loading />}
        <div className="p-4">
            <h1 className="text-3xl py-4 dark:text-white">Categories</h1>
            <div className="flex flex-col md:flex-row items-baseline flex-wrap space-y-2">
                {categories?.map((category, index) =>
                    <div className="w-full md:w-1/3 p-4" key={index}>
                        <div className='flex-flex-col transition-all rounded-md shadow-none hover:shadow-md border-[1px] border-opacity-25 border-slate-500 hover:shadow-green-500 w-full overflow-hidden cursor-pointer' onClick={ ()=> {getSubCategories(category._id,category.name)} }>
                        <div className="w-full">
                            <img src={category.image} alt={category.name} className='w-full h-[300px] object-cover'/>
                        </div>
                        <h3 className='w-full text-center text-2xl py-4 text-green-500 font-medium'>{category.name}</h3>
                    </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col md:flex-row items-baseline flex-wrap space-y-2 py-4">
                {subCategoryName && <h3 className='text-3xl text-green-500 text-center w-full font-medium'>{subCategoryName} SubCategories</h3>}
                {subCategories?.map((subCategory, index) =>
                    <div className="w-full md:w-1/3 p-4" key={index}>
                        <div className='flex-flex-col transition-all rounded-md shadow-none hover:shadow-md border-[1px] border-opacity-25 border-slate-500 hover:shadow-green-500 w-full overflow-hidden cursor-pointer'>
                        <h3 className='w-full text-center text-2xl py-4 text-green-500 font-medium'>{subCategory.name}</h3>
                    </div>
                    </div>
                )}
            </div>
        </div>
    </>
}
