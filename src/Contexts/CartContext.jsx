import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export let CartContext = createContext();

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    let headers = { token: localStorage.getItem('userToken') };

    async function getCart() {
        if (!localStorage.getItem('userToken'))
            return;
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers});

            //console.log(data);

            setCart(data);
            
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    async function checkoutCash(shippingAddress){
        setLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,{shippingAddress}, {headers});

            //console.log(data);

            setCart(data);
            location.href = '/allorders';
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    async function checkoutStripe(shippingAddress){
        setLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${location.origin}`,{shippingAddress}, {headers});

            //console.log(data);
            location.href = data.session.url;
            
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    async function addProductToCart(id) {
        setLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
                { productId: id }
                , {headers});

            //console.log(data);

            toast.success(data.message, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',

                },
            });

            setCart(data);
            
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    async function updateProductCount(id,count) {
        setLoading(true);
        if (!count){
            //remove
            deleteProductFromCart(id);
            return;
        }
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
                {count}
                , {headers});

            //console.log(data);
            toast.success('Item quantity has been updated', {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',
                    
                },
            });
            setCart(data);
            
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    async function deleteProductFromCart(id) {
        setLoading(true);
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers});

            //console.log(data);
            toast.success('Item has been removed from the Cart', {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',
                    
                },
            });
            setCart(data);
            
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    async function clearCart() {
        setLoading(true);
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {headers});

            //console.log(data);
            toast.success('Cart has been cleared', {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',
                    
                },
            });
            setCart(data);
            
        }
        catch (err) {
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(err);
        }
        setLoading(false);
    }

    return <CartContext.Provider value={{addProductToCart, getCart, cart, setCart,updateProductCount, loading,setLoading, deleteProductFromCart, clearCart, checkoutCash, checkoutStripe}}>
        {children}
    </CartContext.Provider>
}