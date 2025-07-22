import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
 

export default function CategoriesSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 8,      
        slidesToScroll: 3,
        autoplay: true,
        responsive: [         
            {
                breakpoint: 1280, 
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,  
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,  
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    function getCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                setCategories(data.data);
                setIsLoading(false); 
            })
            .catch((error) => {
                console.error("Failed to fetch categories:", error);
                setIsLoading(false); 
            });
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="py-5">
                <h2 className='py-4 text-gray-800 text-xl font-medium'>Shop Popular Categories</h2>
                <p>Loading categories...</p>
            </div>
        );
    }

    return (
        <div className="py-5">
            <h2 className='py-4 text-gray-800 text-xl font-medium'>Shop Popular Categories</h2>
            <Slider {...settings}>
                {categories.map((category) =>
                    <div key={category._id} className="px-2"> 
                        <img className='w-full h-48 sm:h-64 object-cover rounded-lg' src={category.image} alt={category.name} />
                        <h3 className='text-gray-600 mt-2 text-center font-semibold'>{category.name}</h3>
                    </div>
                )}
            </Slider>
        </div>
    );
}