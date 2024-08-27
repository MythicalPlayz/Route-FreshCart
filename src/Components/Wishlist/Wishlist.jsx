import React, { useContext, useEffect, useState } from 'react'
import './Wishlist.module.css'
import { WishlistContext } from '../../Contexts/WishlistContext'
import Loading from '../Loading/Loading';

export default function Wishlist() {

    let { getWishlist, setWishlist, deleteProductFromWishlist, loading, wishlist } = useContext(WishlistContext);

    useEffect(() => {
        document.title = 'FreshCart: Wishlist';
    }, []);

    return <>

        <div className="p-4">
            <h1 className="text-3xl dark:text-white py-4">Wishlist</h1>
            {loading ? <Loading /> : <div>
                {!wishlist?.length ?
                    <div className="flex justify-center">
                        <h2 className='dark:text-white font-medium text-[1.5rem]'>Wishlist is Empty</h2>
                    </div> :

                    <div className="relative overflow-x-auto w-full md:w-5/6 mx-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className=''>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((product, index) =>
                                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">
                                            <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => { deleteProductFromWishlist(product.id) }}>Remove</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>}
            </div>}
        </div>
    </>
}
