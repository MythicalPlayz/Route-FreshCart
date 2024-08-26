import React, { useContext, useEffect, useState } from 'react'
import './Details.module.css'
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Loading from '../Loading/Loading';
import axios from 'axios';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { CartContext } from '../../Contexts/CartContext';
import { WishlistContext } from '../../Contexts/WishlistContext';

export default function Details() {

  useEffect(() => {
    document.title = 'FreshCart: Details';
}, []);


  let {addProductToCart, setLoading} = useContext(CartContext);
  let loadingShop = useContext(CartContext).loading;
  let { getWishlist, isItemWishlisted, addProductToWishlist, deleteProductFromWishlist, loading } = useContext(WishlistContext);
  useEffect(() => {
    getWishlist();
}, []);

  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var settings2 = {
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

  const [productDetails, setProductDetails] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  let { id } = useParams();

  async function getProductDetails(ft) {
    setLoading(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProductDetails(data.data);
    if (ft)
      await getCategoryRelatedProducts(data.data.category.name);
    setLoading(false);
  }

  async function getCategoryRelatedProducts(categoryName) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`);
    setRelatedProducts(data.data.filter((product) => { return product.category.name === categoryName }));
  }
  
  useEffect(() => {
    getProductDetails(true);
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return <>

    <h1 className="text-5xl dark:text-white">Product Details</h1>
    {productDetails.category ? <div className="flex flex-wrap md:flex-nowrap justify-center items-center py-10 px-4">
      <div className="w-full md:w-1/4">
        {
          productDetails.images.length > 1 ?
          <Slider {...settings}>
          {productDetails.images?.map((image, index) => <img src={image} key={index} className='w-full'></img>)}
          </Slider> :
          <img src={productDetails.imageCover} alt={productDetails.title} />
        }
      </div>
      <div className="w-full md:w-3/4 p-4">
        <h2 className='font-medium dark:text-white'>{productDetails.title}</h2>
        <p className='my-6 text-gray-500'>{productDetails.description}</p>
        <h3 className='text-green-500 text-sm font-bold'>{productDetails.category?.name}</h3>
        <div className="flex justify-between my-2">
          <h3 className='text-green-500 text-sm font-bold'>{productDetails.price + ' L.E'}</h3>
          <div className="">
            <h3><i className='fa-solid fa-star text-yellow-400'></i><span className='dark:text-white'>{productDetails.ratingsAverage}</span></h3>
            { isItemWishlisted(productDetails.id) ? <i className='fa-solid fa-heart fa-2x cursor-pointer text-pink-500'></i> : <i className='fa-solid fa-heart fa-2x cursor-pointer'></i>}
          </div>
        </div>
        <button className='btn w-full text-white bg-green-500 rounded-md py-1 my-2' onClick={() => {addProductToCart(productDetails.id);}}><i className='fa-solid fa-cart-plus'></i> Add to Cart</button>
        { isItemWishlisted(productDetails.id) ? <button className='btn w-full text-white bg-pink-500 rounded-md py-1 my-2' onClick={() => {deleteProductFromWishlist(productDetails.id)}}><i className='fa-solid fa-heart'></i> Remove from Wishlist</button> : <button className='btn w-full text-white bg-pink-500 rounded-md py-1 my-2' onClick={() => {addProductToWishlist(productDetails.id)}}><i className='fa-solid fa-heart'></i> Add to Wishlist</button>}
      </div>
    </div> : <Loading />}
    {(loading || loadingShop) && <Loading/>}
    <div className="w-full py-8">
      <h4 className='dark:text-white py-4 font-medium text-[20px]'>Related Products</h4>
      <Slider {...settings2}>
        {relatedProducts?.map((product, index) =>
          <RelatedProducts product={product} key={index} />
        )}
      </Slider>
    </div>
  </>
}
