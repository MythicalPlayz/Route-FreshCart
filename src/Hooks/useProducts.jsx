import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

export default function useProducts() {
    async function getProducts() {
        try {
            return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        } catch (error) {
            toast.error(error, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
            //console.warn(error);
            return null;
        }
    }


    let response = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        gcTime: 3600000, //1 hour
        staleTime: 3600000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
        retryDelay: 10000,
        select:(data)=> data?.data?.data

    });

    return response;
}
