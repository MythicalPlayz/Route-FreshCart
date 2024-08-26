import React, { useContext, useEffect, useState } from 'react'
import './AllOrders.module.css'
import { CartContext } from '../../Contexts/CartContext'
import toast from 'react-hot-toast';

export default function AllOrders() {

    let { clearCart } = useContext(CartContext);

    useEffect(() => {
        toast.success('Checkout Complete', {
            duration: 3000,
            position: 'top-right',
            style: {
                backgroundColor: '#22c55e',
                color: '#fff',
            },
        }, []);
        clearCart();
        document.title = 'FreshCart: Order Successful';
    }, [])

    return <>

        <h1 className="text-3xl text-center dark:text-white py-4">Order Success</h1>

    </>
}
