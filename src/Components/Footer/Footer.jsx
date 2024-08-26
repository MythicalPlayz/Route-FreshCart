import React, { useState } from 'react'
import './Footer.module.css'
import amazon from '../../assets/images/footer/amazon-pay.png'
import amex from '../../assets/images/footer/amex.png'
import mc from '../../assets/images/footer/mastercard.png'
import paypal from '../../assets/images/footer/paypal.png'
import apple from '../../assets/images/footer/app-store.png'
import google from '../../assets/images/footer/google-play-icon.png'
export default function Footer() {


    return <footer>
        <div className='w-full p-6 bg-[#f0f0f0] dark:bg-gray-400'>
            <h2 className='text-3xl'>Get the FreshCart app</h2>
            <h3 className='text-2xl text-slate-500 dark:text-slate-800'>We will send you a link, open it on your phone to download the app</h3>
            <div className='flex flex-col md:flex-row justify-between md:p-12'>
                <input type="email" name="email" id="email" placeholder='Enter your Email' className='p-4 w-full md:w-4/5 rounded-md' />
                <button className='p-2 w-full md:w-1/5 my-2 md:mx-2 bg-green-500 rounded-md text-white'>Get App Link</button>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between md:p12 border-slate-500 border-y-2 p-12">
                <div className='flex flex-wrap space-x-2 items-center w-full md:w-auto'>
                    <h3 className='text-2xl'>Payment Methods</h3>
                    <img src={amazon} alt="Amazon Pay" className='dark:bg-white dark:p-1 transition-all rounded h-10 w-10'/>
                    <img src={amex} alt="American Express" className='dark:bg-white dark:p-1 transition-all rounded h-10 w-10'/>
                    <img src={paypal} alt="Paypal" className='dark:bg-white dark:p-1 transition-all rounded h-10 w-10'/>
                    <img src={mc} alt="MasterCard" className='dark:bg-white dark:p-1 transition-all rounded h-10 w-10'/>
                </div>
                <div className='flex flex-wrap space-x-2 items-center w-full md:w-auto'>
                    <h3 className='text-2xl'>Get Deliveries from the FreshCart App</h3>
                    <img src={apple} alt="Amazon Pay" className='rounded h-10'/>
                    <img src={google} alt="American Express" className='rounded h-10'/>
                </div>
            </div>
        </div>
        <div className="w-full py-4 flex flex-col justify-center items-center bg-gray-500 text-white">
            <h4>Copyright ©️2024</h4>
            <h4>Follow us</h4>
            <ul className='flex space-x-2 justify-center items-center'>
                <li><a href="https://facebook.com"><i className='fa-brands fa-facebook-f'></i></a></li>
                <li><a href="https://linkedin.com"><i className='fa-brands fa-linkedin-in'></i></a></li>
                <li><a href="https://youtube.com"><i className='fa-brands fa-youtube'></i></a></li>
                <li><a href="https://twitter.com"><i className='fa-brands fa-twitter'></i></a></li>
                <li><a href="https://instagram.com"><i className='fa-brands fa-instagram'></i></a></li>
            </ul>
        </div>
            
    </footer>
}
