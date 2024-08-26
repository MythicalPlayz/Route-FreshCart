import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

export default function Layout() {
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('userToken')){
      navigate('/login');
    }
  }, [])

  return (
    <>
    <Nav/>
    <div className="container md:pt-12 layout dark:bg-gray-900">
        <Outlet></Outlet>
    </div>
    <Footer/>
    </>
  )
}
