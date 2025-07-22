import React, { useContext } from 'react';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {
  
  let { addToCart, setCart, getCartItems } = useContext(CartContext);
  let { data, isError, error, isLoading } = useProducts();

  async function addProductToCart(productId) {
    let addResponse = await addToCart(productId);

    if (addResponse.data.status === 'success') {
      toast.success('Product added successfully to your cart');
      let cartDetails = await getCartItems();
      if (cartDetails?.data) {
        setCart(cartDetails.data);
      }
    } else {
      toast.error('Error adding Product to your cart');
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <i className="fas fa-spinner fa-spin fa-3x text-green-600"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className='flex flex-wrap -mx-2'> 
      {data.map((product) => (
        <div key={product.id} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2'>
          <div className='product p-2  rounded-lg h-full flex flex-col'>
            <Link to={`/productdetails/${product.id}/${product.category.name}`} className="flex-grow">
              <img className='w-full' src={product.imageCover} alt={product.title} />
              <span className='block font-light text-green-600 mt-2'>{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className='flex justify-between items-center'>
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
              </div>
            </Link>
            <button onClick={() => addProductToCart(product.id)} className='btn mt-auto'>
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}