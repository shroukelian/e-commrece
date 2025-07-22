import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
    let { getCartItems, removeCartItems, updateToCart, setCart } = useContext(CartContext);
    const [cartDetails, setcartDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function getCart() {
        let response = await getCartItems();
        if (response?.data) {
            setcartDetails(response.data);
        }
        setIsLoading(false);
    }

    async function removeItem(productId) {
        let response = await removeCartItems(productId);
        if (response.data.status === 'success') {
            setcartDetails(response.data);
            setCart(response.data);
            toast.success('Product removed successfully.');
        } else {
            toast.error('Failed to remove product.');
        }
    }

    async function updateQuantity(productId, count) {
        let response = await updateToCart(productId, count);
        if (response.data.status === 'success') {
            setcartDetails(response.data);
            setCart(response.data);
        } else {
            toast.error('Failed to update quantity.');
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    if (!cartDetails || cartDetails.numOfCartItems === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/product" className="btn">Start Shopping</Link>
            </div>
        );
    }
    
    return (
        <>  
            <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3 text-center">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartDetails?.data.products.map((product) =>
                            <tr key={product.product.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-4">
                                    <img src={product.product.imageCover} className="w-18 h-16 object-cover rounded" alt={product.product.title} />
                                    <span className='px-6 py-4 text-[16px] font-semibold text-gray-900 dark:text-white'>{product.product.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className="btn-quantity">-</button>
                                        <span className="mx-3 font-semibold">{product.count}</span>
                                        <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className="btn-quantity">+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 text-[16px]">
                                    {product.price} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => removeItem(product.product.id)} className="font-medium text-red-600 hover:underline">Remove</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

                 <div className="md:hidden space-y-4">
                {cartDetails?.data.products.map((product) => (
                    <div key={product.product.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex gap-4  pb-4">
                            <img src={product.product.imageCover} className="w-20 h-20 object-cover rounded" alt={product.product.title} />
                            <div className="flex-1">
                                <p className="font-bold text-gray-800 text-sm">{product.product.title}</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4">
                            <div>
                                <p className="text-xs text-gray-500">Price</p>
                                <p className="font-semibold text-gray-700">{product.price} EGP</p>
                            </div>

                            <div className="flex items-center">
                                <button onClick={() => updateQuantity(product.product.id, product.count - 1)} className="btn-quantity">-</button>
                                <span className="mx-3 font-semibold">{product.count}</span>
                                <button onClick={() => updateQuantity(product.product.id, product.count + 1)} className="btn-quantity">+</button>
                            </div>

                            <button onClick={() => removeItem(product.product.id)} className="cursor-pointer font-medium text-red-600  hover:underline text-sm">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            <Link to={'/checkout'} className="flex justify-end mt-6">
                <button className='btn text-lg'>Proceed to Checkout</button>
            </Link>
        </>
    );
}
