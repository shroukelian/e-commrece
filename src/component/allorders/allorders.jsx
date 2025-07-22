import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { jwtDecode } from 'jwt-decode'; // استيراد المكتبة
// import {  } from 'react-'; 

export default function AllOrders() {
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getUserOrders } = useContext(CartContext);

    useEffect(() => {
        // 1. Get user ID from token
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            
            // 2. Fetch orders for this user
            async function fetchOrders() {
                try {
                    const { data } = await getUserOrders(userId);
                    setOrders(data);
                } catch (error) {
                    console.error("Failed to fetch orders", error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchOrders();
        } else {
            setIsLoading(false);
        }
    }, [getUserOrders]);

    // 3. Handle loading state
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-20">
                <h1>My Orders</h1>
                <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
                <p className="text-gray-600">You haven't placed any orders yet.</p>
            </div>
        );
    }
    
    // 5. Display the orders
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <div>
                                <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                                <p className="text-sm text-gray-500">
                                    Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">{order.totalOrderPrice} EGP</p>
                                <span className={`px-3 py-1 text-sm rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.isPaid ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                        </div>
                        
                        <h3 className="font-semibold mb-3">Items in this order:</h3>
                        <div className="space-y-3">
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-4">
                                    <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="font-medium">{item.product.title}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.count} - Price: {item.price} EGP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}