import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Products from './component/Products/Products'
import Category from './component/Category/Category'
import Cart from './component/Cart/Cart'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Notfound from './component/Notfound/Notfound'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import UserContextProvider from './Context/userContext'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './component/Checkout/Checkout'
import Allorders from './component/allorders/allorders'
import Brands from './component/Brands/Brands'
import Brandsdetails from './component/Brandsdetails/Brandsdetails'
import CategoryDetails from './component/CategoryDetails/CategoryDetails'


let query = new QueryClient();
const repoName = '/e-commrece'; 


let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      // { index: true, element: <Login /> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'product', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Category /></ProtectedRoute> },
      { path: 'categorydetails/:id', element: <ProtectedRoute><CategoryDetails /></ProtectedRoute> },

      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'branddetails/:id', element: <ProtectedRoute><Brandsdetails /></ProtectedRoute> },



      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> }
    ]
  }
],
 { basename: repoName } 
)
function App() {
  const [count, setCount] = useState(0)


  return <>
    <>
      <CartContextProvider>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <RouterProvider router={router} ></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>

    </>
  </>
}

export default App
