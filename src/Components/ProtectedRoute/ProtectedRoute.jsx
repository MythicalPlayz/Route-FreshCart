import React, { useEffect, useState } from 'react'
import './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    useEffect(()=> {
        if (!localStorage.getItem('userToken')){
            <Navigate to={'/login'}/>
        }
    
    },[])
    return <>

        {children}

    </>
}
