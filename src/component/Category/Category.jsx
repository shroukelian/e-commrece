// في ملف Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><i className="fas fa-spinner fa-spin fa-3x text-green-600"></i></div>;
    }

    return (
        <div className="container mx-auto">
            <title>Categories</title>
            <h1 className="text-3xl font-bold text-green-600 text-center mb-10">All Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div key={category._id} className=" rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <Link to={`/categorydetails/${category._id}`}>
                            <img src={category.image} alt={category.name} className="w-full h-64 object-cover" />
                            <h2 className="text-xl font-semibold text-center text-green-700 p-4">{category.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}