// في ملف CategoryDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function CategoryDetails() {
    const { id } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { addToCart, setCart, getCartItems } = useContext(CartContext);

    async function addProductToCart(productId) {
        let addResponse = await addToCart(productId);
        if (addResponse.data.status === 'success') {
            toast.success('Product added successfully');
            let cartDetails = await getCartItems();
            if (cartDetails?.data) setCart(cartDetails.data);
        } else {
            toast.error('Failed to add product');
        }
    }

    useEffect(() => {
        async function getDetailsAndProducts() {
            setIsLoading(true);
            try {
                const categoryRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
                setCategoryDetails(categoryRes.data.data);

                const productsRes = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
                const filteredProducts = productsRes.data.data.filter(product => product.category._id === id);
                setCategoryProducts(filteredProducts);

            } catch (error) {
                console.error("Failed to fetch category data", error);
            } finally {
                setIsLoading(false);
            }
        }

        getDetailsAndProducts();
    }, [id]);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    if (!categoryDetails) {
        return <div className="text-center py-20"><h2 className="text-2xl font-bold">Category not found.</h2></div>;
    }

    return (
        <div className="container mx-auto my-12">
            <title>{categoryDetails.name}</title>
            
            <div className="text-center border-b border-gray-400 pb-8 mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">{categoryDetails.name}</h1>
                <p className="text-lg text-gray-600 mt-2">Browse products in the {categoryDetails.name} category</p>
            </div>

            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                        <div key={product.id} className='product p-2 rounded-lg h-full flex flex-col'>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`} className="flex-grow">
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <span className='block font-light text-green-600 mt-2'>{product.brand.name}</span>
                                <h3 className='text-md font-normal text-gray-800 mb-2'>{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                <div className='flex justify-between items-center text-sm'>
                                    <span>{product.price} EGP</span>
                                    <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                                </div>
                            </Link>
                            <button onClick={() => addProductToCart(product.id)} className='btn mt-auto'>add to cart</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-10">No products found for this category.</p>
            )}
        </div>
    );
}