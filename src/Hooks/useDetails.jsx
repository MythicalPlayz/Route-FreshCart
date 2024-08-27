import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

export default function useDetails(id) {
    async function getDetails() {
        try {
            return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
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
        queryKey: ['productDetails', id],
        queryFn: getDetails,
        gcTime: 60000,
        staleTime: 60000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
        retryDelay: 10000,
        select:(data)=> data?.data?.data

    });

    return response;
}
