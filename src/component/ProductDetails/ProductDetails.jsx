import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick"; 
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    let { id } = useParams();
    
    var mainSliderSettings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    
    var relatedProductsSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, 
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
        ]
    };

    let { addToCart, setCart, getCartItems } = useContext(CartContext);
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function addProductToCart(productId) {
        let addResponse = await addToCart(productId);
        if (addResponse.data.status === 'success') {
            toast.success('Product added successfully to your cart');
            let cartDetails = await getCartItems();
            if(cartDetails?.data) setCart(cartDetails.data);
        } else {
            toast.error('Error adding Product to your cart');
        }
    }

    function getProductDetails(productId) {
        setIsLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
            .then(({ data }) => {
                setProductDetails(data.data);
                getRelatedProducts(data.data.category.name, data.data.id);
            })
            .catch(() => setIsLoading(false));
    }

    function getRelatedProducts(productCategory, currentProductId) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                let related = allProducts.filter((product) => product.category.name === productCategory && product.id !== currentProductId);
                setRelatedProducts(related);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductDetails(id);
    }, [id]);

    if (isLoading || !productDetails) {
        return <div className="h-screen flex justify-center items-center "><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap my-5">
                <div className="w-full md:w-1/4">
                    <Slider {...mainSliderSettings}>
                        {productDetails?.images.map((src) => <img className='w-full' src={src} alt={productDetails?.title} key={src} />)}
                    </Slider>
                </div>
                <div className="w-full md:w-3/4 p-6">
                    <h1 className='text-xl font-bold text-gray-950'>{productDetails?.title}</h1>
                    <p className='text-gray-600 font-light mt-4'>{productDetails?.description}</p>
                    <div className='flex my-4 justify-between items-center'>
                        <span className="text-lg font-semibold">{productDetails?.price} EGP</span>
                        <span>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                    </div>
                    <button onClick={() => addProductToCart(productDetails.id)} className='btn cursor-pointer'>add to cart</button>
                </div>
            </div>

            <h2 className="text-2xl font-bold m-4 py-6">Related Products</h2>
            
            <Slider {...relatedProductsSettings}>
                {relatedProducts.map((product) => (
                    <div key={product.id} className="p-2"> 
                        <div className='product p-2  rounded-lg h-full flex flex-col'>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`} className="flex-grow">
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <span className='block font-light text-green-600 mt-2'>{product.category.name}</span>
                                <h3 className='text-md font-normal text-gray-800 mb-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <div className='flex justify-between items-center text-sm'>
                                    <span>{product.price} EGP</span>
                                    <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                                </div>
                            </Link>
                            <button onClick={() => addProductToCart(product.id)} className='btn mt-auto'>add to cart</button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}