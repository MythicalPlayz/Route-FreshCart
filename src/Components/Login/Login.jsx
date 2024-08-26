import React, { useContext, useEffect, useState } from 'react';
import './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { UserContext } from '../../Contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'FreshCart: Login';
  }, []);


  let { setUserData } = useContext(UserContext);

  async function handleLogin(values) {
    try {
      setLoading(true)
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      localStorage.setItem('userToken', data.token);
      setUserData({ token: data.token, name: data.user.name });
      setApiError(null);
      toast.success('Login Success', {
        duration: 3000,
        position: 'top-right',
        style: {
          backgroundColor: '#22c55e',
          color: '#fff',
        },
      }, []);
      //console.log(data);
      navigate('/')
      setLoading(false);
    }
    catch (err) {
      setApiError(err.response.data.message)
      setLoading(false)
    }

  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z]\w{5,10}/, 'Password is invalid ex(Ahmed123)').required('Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema
    , onSubmit: handleLogin
  });

  return (
    <>
      <div className="container w-5/6 md:w-1/2 mx-auto">
        <h2 className="text-3xl py-6 font-bold dark:text-white">Login Now</h2>
        <form onSubmit={formik.handleSubmit} className="">
          {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>}
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
          </div>
          {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>}
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password:</label>
          </div>
          {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>}
          <div className="w-full flex justify-between">
            {!loading ? <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
              : <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"><i className='fa-solid fa-spinner fa-spin-pulse'></i></button>}
            <Link to={'/forget'}><h2 className='dark:text-white'>Forgot Password?</h2></Link>
          </div>
        </form>
      </div>
    </>
  )
}

