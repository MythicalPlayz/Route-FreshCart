import React, { useContext, useEffect, useState } from 'react'
import './Checkout.module.css'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import * as Yup from 'yup'
import { CartContext } from '../../Contexts/CartContext';

export default function Checkout() {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        document.title = 'FreshCart: Checkout';
    }, []);


    let { loading, checkoutCash, checkoutStripe } = useContext(CartContext);

    let validationSchema = Yup.object().shape({
        details: Yup.string().required('Address Details are required'),
        city: Yup.string().required('City is required'),
        phone: Yup.string().matches(/^(\+)?(002)?01[0125][0-9]{8}$/, 'Phone must be Egyptian Number').required('Phone is required'),
        checkout: Yup.string().required('Type of Payment has not been selected'),
    });

    async function handleCheckout(address) {
        if (address.checkout === 'cash') {
            checkoutCash(address);
        }
        else {
            checkoutStripe(address);
        }
        
    }


    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
            checkout: ''
        }, validationSchema
        , onSubmit: handleCheckout
    });

    return <>
        {loading && <Loading />}
        <div className="container w-5/6 md:w-1/2 mx-auto">
            <h2 className="text-3xl py-6 font-bold dark:text-white">Checkout</h2>
            <form onSubmit={formik.handleSubmit} className="">
                {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apiError}
                </div>}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="details" id="details" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Address Details:</label>
                </div>
                {formik.errors.details && formik.touched.details && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.details}
                </div>}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="phone" id="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone:</label>
                </div>
                {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.phone}
                </div>}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="city" id="city" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City:</label>
                </div>
                {formik.errors.city && formik.touched.city && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.city}
                </div>}
                <h4 className='text-xl dark:text-white'>Select Payment Type:</h4>
                <div className='flex justify-between w-1/2 p-4 mx-auto'>
                    <div className='space-x-2 dark:text-white'>
                        <input type="radio" id="checkout-cash" name="checkout" value="cash" onChange={formik.handleChange} onBlur={formik.handleBlur}  checked={formik.values.checkout === 'cash'}/>
                        <label htmlFor="checkout-cash"><i className='fas fa-money-bill'></i> Cash</label>
                    </div>
                    <div className='space-x-2 dark:text-white'>
                        <input type="radio" id="checkout-card" name="checkout" value="card" onChange={formik.handleChange} onBlur={formik.handleBlur}  checked={formik.values.checkout === 'card'}/>
                        <label htmlFor="checkout-card"><i className='fas fa-credit-card'></i> Card</label>
                    </div>
                </div>
                {formik.errors.checkout && formik.touched.checkout && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.checkout}
                </div>}
                <div className="w-full flex justify-between">
                    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"><i className='fas fa-bag-shopping'></i> Checkout</button>
                </div>
            </form>
        </div>
    </>
}
