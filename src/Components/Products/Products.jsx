import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts';
import Loading from '../Loading/Loading';
import { WishlistContext } from '../../Contexts/WishlistContext';
import './Products.module.css'
import useProducts from '../../Hooks/useProducts';

export default function Products() {

    useEffect(() => {
        if (location.href.includes('products'))
            document.title = 'FreshCart: Products';
    }, []);

    const [products, setProducts] = useState(null);

    let {data, isLoading, isFetching, isError, error} = useProducts();


    let { getWishlist, wishlist, isItemWishlisted } = useContext(WishlistContext);

    

    function filter(e) {
        let element = e.target;
        setProducts(data.filter((product) => { return product.title.toLowerCase().includes(element.value.toLowerCase()) }));
    }

    useEffect(() => {
        setProducts(data);
    }, [data]);


    return <>
        {isLoading && <Loading />}
        <div className='w-full md:w-5/6 mx-auto mt-4'>
            <div className="w-5/6 mx-auto flex my-4 rounded-md overflow-hidden mb-4">
                <div className="flex gap-x-2 text-white bg-gray-500 p-2 justify-center items-center">
                    <i className='fa-solid fa-search'></i>
                    <h4>Search</h4>
                </div>
                <input type="text" name='' id='search' className='w-full px-2 transition-all border-black border-[1px] rounded-e-md' onKeyUp={filter} />
            </div>
            <div className="flex flex-wrap justify-center pb-4">
                {data ? products?.map((product, index) => <RecentProducts key={index} product={product} isWishlisted={isItemWishlisted(product.id)} />) : <h3 className='text-xl font-medium dark:text-white'>Sorry there are no products to display</h3>}
            </div>
        </div>
    </>
}
