import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {


    let headers = {
        token: localStorage.getItem('userToken')
    }

    let [cart, setCart] = useState(null);

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        },
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }

    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }
    function removeCartItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }


    function updateToCart(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        },
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }


    function checkOut(cartId, url, formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: formValues
        },
            {
                headers
            })
            .then((response) => response)
            .catch((err) => err)
    }


    async function getCart() {
        let response = await getCartItems();
        setCart(response.data)
    }


      function getUserOrders(userId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            .then((response) => response)
            .catch((err) => err);
    }

    useEffect(() => {
        getCart();

    }, [])




    return <CartContext.Provider value={{ cart, setCart, checkOut, addToCart, getCartItems, removeCartItems, updateToCart, getUserOrders }}>
        {props.children}
    </CartContext.Provider>

}
