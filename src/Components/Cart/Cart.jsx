import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Contexts/CartContext'
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    let navigate = useNavigate();

    let { getCart, cart, updateProductCount, loading, deleteProductFromCart, clearCart } = useContext(CartContext);

    useEffect(() => {
        document.title = 'FreshCart: Cart';
    }, []);

    function checkout(){
        navigate('/checkout');
    }


    return <>

        <div className="p-4">
            <h1 className="text-3xl dark:text-white py-4">Cart</h1>
            {loading || !cart ? <Loading /> : <div>
                {!cart?.numOfCartItems ?
                    <div className="flex justify-center">
                        <h2 className='dark:text-white font-medium text-[1.5rem]'>Cart is Empty</h2>
                    </div> :

                    <div className="relative overflow-x-auto w-full md:w-5/6 mx-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className='text-center'>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.data.products.map((product, index) =>
                                    <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">
                                            <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.product.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => { updateProductCount(product.product.id, Math.max(0, product.count - 1)) }}>
                                                    <span className="sr-only">Quantity button</span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <div>
                                                    <span>{product.count}</span>
                                                </div>
                                                <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => { updateProductCount(product.product.id, product.count + 1) }}>
                                                    <span className="sr-only">Quantity button</span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.price} L.E
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => { deleteProductFromCart(product.product.id) }}>Remove</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className='bg-gray-50 dark:bg-gray-700'>
                                <tr className='text-xl p-4 text-black dark:text-white'>
                                    <th className='p-2' colSpan={4}>Total:</th>
                                    <th className='py-2'>{cart.data.totalCartPrice} L.E</th>
                                </tr>
                            </tfoot>
                        </table>
                        <div className='flex justify-center items-center space-x-2 py-4'>
                            <button className='text-white bg-red-500 p-2 rounded-md space-x-2' onClick={() => { clearCart() }}><i className='fas fa-trash'></i><span>Clear Cart</span></button>
                            <button className='text-white bg-green-500 p-2 rounded-md space-x-2' onClick={() => { checkout() }}><i className='fas fa-bag-shopping'></i><span>Checkout</span></button>
                        </div>
                    </div>}


            </div>}
        </div>

    </>
}
