import React, { useContext, useState } from 'react'
import './RecentProducts.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Contexts/CartContext';
import { WishlistContext } from '../../Contexts/WishlistContext';
import Loading from '../Loading/Loading';

export default function RecentProducts({ product, isWishlisted }) {

    let { addProductToCart } = useContext(CartContext);
    let loadingShop = useContext(CartContext).loading;
    let { isItemWishlisted, addProductToWishlist, deleteProductFromWishlist, loading } = useContext(WishlistContext);
    return <>
        <div className='w-full md:w-1/2 lg:w-1/4 p-4'>
            <div className="product border-green-500 hover:border-2 focus:border-2 rounded-md shadow-none hover:shadow-md overflow-hidden p-2">
                <Link className="cursor-pointer" to={`/details/${product.id}`}>
                    <div className="image-holder pb-2">
                        <img src={product.imageCover} alt={product.tile} />
                    </div>
                    <div className="flex justify-between w-full py-4">
                        <div>
                            <h3 className='text-main'>{product.category.name}</h3>
                            <h3 className='font-medium dark:text-white'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                        </div>
                        {isWishlisted ?
                            <i className='fa-solid fa-heart fa-2x cursor-pointer text-pink-500'></i>
                            :
                            <i className='fa-solid fa-heart fa-2x cursor-pointer'></i>
                        }
                    </div>
                    <div className='flex justify-between w-full py-4'>
                        <h3 className='font-bold text-main'>{product.price} L.E</h3>
                        <div className='flex items-center space-x-2'>
                            <i className='fa-solid fa-star text-yellow-400'></i>
                            <h3 className='dark:text-white'>{product.ratingsAverage}</h3>
                        </div>
                    </div>
                </Link>
                {!loading ? <>
                    { isWishlisted ?
                <button className='btn w-full text-white bg-pink-500 rounded-md py-1 my-1 transition-all duration-500' onClick={() => { deleteProductFromWishlist(product.id) }}><i className='fa-solid fa-heart'></i> Remove from Wishlist</button>
                :
                <button className='btn w-full text-white bg-pink-500 rounded-md py-1 my-1 transition-all duration-500' onClick={() => { addProductToWishlist(product.id) }}><i className='fa-solid fa-heart'></i> Add to Wishlist</button>
                        }
                </> : <Loading/>
                }
                {loadingShop && <Loading/>}
                <button className='btn w-full text-white bg-green-500 rounded-md py-1 my-1 transition-all duration-500' onClick={() => { addProductToCart(product.id) }}><i className='fa-solid fa-cart-plus'></i> Add to Cart</button>

            </div>
        </div>

    </>
}
