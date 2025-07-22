// في ملف BrandDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function BrandDetails() {
    const { id } = useParams();
    const [brandDetails, setBrandDetails] = useState(null);
    const [brandProducts, setBrandProducts] = useState([]);
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
                // Fetch brand details
                const brandRes = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
                setBrandDetails(brandRes.data.data);

                // Fetch all products and filter
                const productsRes = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
                const filteredProducts = productsRes.data.data.filter(product => product.brand._id === id);
                setBrandProducts(filteredProducts);

            } catch (error) {
                console.error("Failed to fetch brand data", error);
            } finally {
                setIsLoading(false);
            }
        }

        getDetailsAndProducts();
    }, [id]);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    if (!brandDetails) {
        return <div className="text-center py-20"><h2 className="text-2xl font-bold">Brand not found.</h2></div>;
    }

    return (
        <div className="container mx-auto">
            
            {/* Brand Header */}
            <div className="text-center border-b border-gray-300 pb-8 mb-10">
                <img src={brandDetails.image} alt={brandDetails.name} className="w-48 h-48 object-contain mx-auto mb-4 rounded-full" />
                <h1 className="text-4xl font-extrabold text-gray-500">{brandDetails.name}</h1>
            </div>

            {/* Products Grid */}
            <h2 className="text-2xl font-bold mb-6">Products by {brandDetails.name} :</h2>
            {brandProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {brandProducts.map((product) => (
                        <div key={product.id} className='product p-2  rounded-lg h-full flex flex-col'>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`} className="flex-grow">
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <span className='block font-light text-green-600 mt-2'>{product.category.name}</span>
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
                <p className="text-center text-gray-600">No products found for this brand.</p>
            )}
        </div>
    );
}