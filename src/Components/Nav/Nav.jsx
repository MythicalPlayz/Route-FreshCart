import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext';
import { CartContext } from '../../Contexts/CartContext';

export default function Nav() {

    let navigate = useNavigate();
    let { userData, setUserData } = useContext(UserContext);
    let {cart, getCart} = useContext(CartContext);

    function logout() {
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate('/login');
    }

    useEffect(() => {
        getCart();
    }, [])

    let isDown = false;

    function toggleNav(e) {
        const button = e.currentTarget.querySelector('i');
        const nLL = document.querySelector('nav .nav-links-left');
        const nLR = document.querySelector('nav .nav-links-right');
        if (!isDown) {
            button.classList.add('rotate-180');
            if (nLL)
                nLL.classList.replace('h-0', 'h-[150px]');
            nLR.classList.replace('h-0', 'h-[120px]');
        }
        else {
            button.classList.remove('rotate-180');
            if (nLL)
                nLL.classList.replace('h-[150px]', 'h-0');
            nLR.classList.replace('h-[120px]', 'h-0');
        }
        isDown = !isDown;
    }

    function toggleTheme(e,ov) {
        let useDark = true;
        if (document.body.classList.contains('dark') && !ov){
            document.body.classList.remove('dark');
            useDark = false;
        }
        else {
            document.body.classList.add('dark');
        }
        localStorage.setItem('useDark',Number(useDark));
    }

    useEffect(()=> {
        let theme = localStorage.getItem('useDark');
        if (theme && Number(theme)){
            toggleTheme('',true);
        }
    },[])

    return (
        <>
            <nav className='bg-gray-200 md:fixed w-full top-0 text-gray-500 capitalize flex flex-col md:flex-row justify-between py-2 z-10'>
                <div className="flex justify-between flex-col md:flex-row items-center md:space-x-3">
                    <div className="flex justify-around w-full md:w-auto px-4">
                        <img src={logo} alt="Company Logo" width={120} />
                        <button onClick={toggleNav} className='md:hidden'><i className='fa-solid fa-angle-down w-12 h-12 p-4  border-black border-2 rounded flex justify-center items-center m-0'></i></button>
                    </div>
                    {userData && <ul className="nav-links-left h-0 md:h-auto overflow-hidden flex-col md:flex-row md:space-x-2 items-center duration-300 md:flex text-center">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/cart'>Cart</NavLink></li>
                        <li><NavLink to='/wishlist'>Wishlist</NavLink></li>
                        <li><NavLink to='/products'>Products</NavLink></li>
                        <li><NavLink to='/categories'>Categories</NavLink></li>
                        <li><NavLink to='/brands'>Brands</NavLink></li>
                    </ul>}
                </div>
                <div className='nav-links-right h-0 overflow-hidden md:h-auto md:space-x-2 flex-col md:flex-row justify-center duration-300 md:flex px-4 text-center items-center'>
                    <i className="fa-solid fa-circle-half-stroke cursor-pointer" onClick={toggleTheme}></i>
                    <ul className='flex md:space-x-2 flex-col md:flex-row items-center'>
                        {!userData? <> 
                            <li><NavLink to='/login'>Login</NavLink></li>
                            <li><NavLink to='/register'>Register</NavLink></li></> : <>
                            <li><Link to='cart'><span className='fa-solid fa-shopping-cart fa-2x relative text-green-500'><span className='absolute right-0 left-0 z-[1] top-0 bottom-0 text-sm text-white'>{cart?.numOfCartItems ? cart.numOfCartItems : 0}</span></span></Link></li>
                            <li><span>{userData.name}</span></li>
                            <li><span className='cursor-pointer' onClick={logout}>Logout</span></li>
                        </>}
                    </ul>
                </div>
            </nav>
        </>
    )
}
