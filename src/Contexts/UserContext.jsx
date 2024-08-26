import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let UserContext = createContext();


export default function UserContextProvider({ children }) {


    const [userData, setUserData] = useState(null);
    const [requireToken, setRequireToken] = useState(false);
    let headers = { token: localStorage.getItem('userToken') };

    async function getRemaingUserInfo() {
        try {
            let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',{}, { headers });
            const user = {
                name: data.user.name,
                token: localStorage.getItem('userToken'),
            }
            setUserData(user);
            //console.log(user);
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
            setRequireToken(true);
        }
    }

    function logout(val){
        if (val) {
            localStorage.removeItem('userToken');
            location.reload(); //Could not get it to use useNavigate nor Navigate tag
        }
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
                getRemaingUserInfo();
        }
    }, [])

    useEffect(() => {
        logout(requireToken);
    }, [requireToken])

    return <UserContext.Provider value={{ userData, setUserData, getRemaingUserInfo }}>
        {children}
    </UserContext.Provider>
}