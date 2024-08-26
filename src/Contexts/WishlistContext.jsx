import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    const [wishlist, setWishlist] = useState(null);
    const [wishlistIDs, setWishlistIDs] = useState([]);
    const [loading, setLoading] = useState(false);

    let headers = { token: localStorage.getItem('userToken') };

    async function getWishlist() {
        if (!localStorage.getItem('userToken'))
            return;
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });

            //console.log(data.data);

            setWishlist(data.data);
            setWishlistIDs(data.data.map((product) => product.id));

        }
        catch (err) {
            //console.warn(err);
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
        }
        setLoading(false);
    }

    async function addProductToWishlist(id) {
        setLoading(true);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId: id }
                , { headers });

            //console.log(data.data);

            toast.success(data.message, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',

                },
            });
            await getWishlist();
        }
        catch (err) {
            //console.warn(err);
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
        }
        setLoading(false);
    }



    async function deleteProductFromWishlist(id) {
        setLoading(true);
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });

            //console.log(data);
            toast.success(data.message, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#22c55e',
                    color: '#fff',

                },
            });
            await getWishlist();
        }
        catch (err) {
            //console.warn(err);
            toast.error(err, {
                duration: 3000,
                position: 'top-right',
                style: {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                },
            }, []);
        }
        setLoading(false);
    }

    function isItemWishlisted(id) {
        if (wishlistIDs) {
            let state = wishlistIDs.includes(id);
            return state;
        }
        return false;
    }

    return <WishlistContext.Provider value={{ addProductToWishlist, wishlist, getWishlist, setWishlist, deleteProductFromWishlist, loading, isItemWishlisted }}>
        {children}
    </WishlistContext.Provider>
}