import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

export default function useCategories() {
    async function getCategories() {
        try {
            return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
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
        queryKey: ['categories'],
        queryFn: getCategories,
        gcTime: 600000, // 10 minutes
        staleTime: 600000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
        retryDelay: 10000,
        select:(data)=> data?.data?.data

    });

    return response;
}
