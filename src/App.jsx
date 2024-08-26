import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import UserContextProvider from './Contexts/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Details from './Components/Details/Details'
import CartContextProvider from './Contexts/CartContext'
import { Toaster } from 'react-hot-toast'
import Cart from './Components/Cart/Cart'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './Contexts/WishlistContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Checkout from './Components/Checkout/Checkout'
import AllOrders from './Components/AllOrders/AllOrders'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'details/:id', element: <ProtectedRoute><Details /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forget', element: <ForgetPassword /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default App
