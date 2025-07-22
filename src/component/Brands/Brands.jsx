// في ملف Brands.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getBrands() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
        } catch (error) {
            console.error("Failed to fetch brands", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-green-600 text-center mb-10">All Brands</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brands.map((brand) => (
                    <div key={brand._id} className="text-center  rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <Link to={`/branddetails/${brand._id}`}>
                            <img src={brand.image} alt={brand.name} className="w-full h-48 object-contain mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800">{brand.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}