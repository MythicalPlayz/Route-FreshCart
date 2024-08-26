import React, { useContext, useEffect, useState } from 'react'
import './ForgetPassword.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'FreshCart: Forgot Password';
    }, []);

    let { getRemaingUserInfo } = useContext(UserContext);


    let validationSchema1 = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
    });

    let validationSchema2 = Yup.object().shape({
        resetCode: Yup.string().required('Code is required'),
    });

    let validationSchema3 = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        newPassword: Yup.string().matches(/^[A-Z]\w{5,10}/, 'Password is invalid ex(Ahmed123)').required('Password is required'),
    });

    async function handleEmail(values) {
        try {
            setLoading(true)
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
            setApiError(null);
            //console.log(data);
            setStep(2);
            setLoading(false);
        }
        catch (err) {
            setApiError(err.response.data.message);
            setLoading(false);
        }
    }

    async function handleCode(values) {
        try {
            setLoading(true)
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
            setApiError(null);
            //console.log(data);
            setStep(3);
            setLoading(false);
        }
        catch (err) {
            setApiError(err.response.data.message);
            setLoading(false);
        }

    }
    async function handleReset(values) {
        try {
            setLoading(true)
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
            localStorage.setItem('userToken', data.token);
            await getRemaingUserInfo();
            setApiError(null);
            //console.log(data);
            toast.success('Password Reset Succcess', {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',
                },
            }, []);
            navigate('/');
            setLoading(false);
        }
        catch (err) {
            setApiError(err.response.data.message);
            setLoading(false);
        }
    }

    let formik1 = useFormik({
        initialValues: {
            email: '',
        }, validationSchema: validationSchema1
        , onSubmit: handleEmail
    });

    let formik2 = useFormik({
        initialValues: {
            resetCode: '',
        }, validationSchema: validationSchema2
        , onSubmit: handleCode
    });

    let formik3 = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        }, validationSchema: validationSchema3
        , onSubmit: handleReset
    });

    const progressWidth = `${(100 * step) / 3}%`;

    return <>

        <div className="container w-5/6 md:w-1/2 mx-auto">
            <h2 className="text-3xl py-6 font-bold dark:text-white">Forgot Password ? No Problem!</h2>
            <h4 className='text-lg py-4 dark:text-white'>Step {step} of 3</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-green-500 h-2.5 rounded-full transition-all" style={{width: progressWidth}}></div>
            </div>
            {
                loading && <Loading />
            }
            {(step === 1) && <>
                <h2 className="text-3xl py-6 font-bold dark:text-white">Enter your Email</h2>
                <form onSubmit={formik1.handleSubmit} className="">
                    {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {apiError}
                    </div>}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="email" id="email" value={formik1.values.email} onBlur={formik1.handleBlur} onChange={formik1.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
                    </div>
                    {formik1.errors.email && formik1.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik1.errors.email}
                    </div>}
                    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
                </form>
            </>
            }

            {(step === 2) && <>
                <div className="py-4">
                    <h2 className="text-3xl py-6 font-bold dark:text-white">Enter your Recovery Code</h2>
                    <span className='dark:text-white py-6'>Check you inbox if it is not there check your spam</span>
                </div>
                <form onSubmit={formik2.handleSubmit} className="">
                    {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {apiError}
                    </div>}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="resetCode" id="resetcode" value={formik2.values.resetCode} onBlur={formik2.handleBlur} onChange={formik2.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                        <label htmlFor="resetcode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Reset Code:</label>
                    </div>
                    {formik2.errors.resetCode && formik2.touched.resetCode && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik2.errors.resetCode}
                    </div>}
                    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
                </form>
            </>
            }
            {(step === 3) && <>
                <div className="py-4">
                    <h2 className="text-3xl py-6 font-bold dark:text-white">Enter your Email and new Password</h2>
                </div>
                <form onSubmit={formik3.handleSubmit} className="">
                    {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {apiError}
                    </div>}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="email" id="email" value={formik3.values.email} onBlur={formik3.handleBlur} onChange={formik3.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
                    </div>
                    {formik3.errors.email && formik3.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik3.errors.email}
                    </div>}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="newPassword" id="password" value={formik3.values.newPassword} onBlur={formik3.handleBlur} onChange={formik3.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                        <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password:</label>
                    </div>
                    {formik3.errors.newPassword && formik3.touched.newPassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik3.errors.newPassword}
                    </div>}
                    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
                </form>
            </>
            }
        </div>
    </>
}
