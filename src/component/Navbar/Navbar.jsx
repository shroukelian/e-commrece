import React, { useContext, useState } from 'react';
import Stlye from './Navbar.module.css';
import logo from '../../imgs/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
    let navigate = useNavigate();
    let { userLogin, setUserLogin } = useContext(UserContext);
    let { cart } = useContext(CartContext);
    console.log(cart);

    const [isOpen, setIsOpen] = useState(false);

    function logOut() {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate('/login');
    }

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className='bg-main-light sticky top-0 right-0 left-0 z-50'>
            <div className="container mx-auto p-4 flex items-center justify-between flex-wrap">

                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <img src={logo} width={110} alt="fresh cart logo" />
                </div>

                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 border rounded text-slate-900 border-slate-900 hover:text-green-600 hover:border-green-600"
                    >
                        <svg className="fill-current h-3 w-3 cursor-pointer" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>


                <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto lg:justify-between flex-grow`}>

                    <ul className='flex flex-col lg:flex-row items-center'>
                        {userLogin !== null ? (
                            <>
                                <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 text-md text-slate-900 font-light' to=''>Home</NavLink></li>
                                {/* <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 text-md text-slate-900 font-light' to='cart'>Cart</NavLink></li> */}
                                <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 text-md text-slate-900 font-light' to='product'>Products</NavLink></li>
                                <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 text-md text-slate-900 font-light' to='brands'>Brands</NavLink></li>
                                <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 text-md text-slate-900 font-light' to='categories'>Category</NavLink></li>
                            </>
                        ) : null}
                    </ul>

                    <ul className='flex flex-col lg:flex-row items-center'>
                        {userLogin === null ? (
                            <>
                                <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 py-2 text-md text-slate-900 font-light' to='login'>Login</NavLink></li>
                                <li className='py-2'><NavLink onClick={handleLinkClick} className='mx-4 py-2 text-md text-slate-900 font-light' to='register'>Register</NavLink></li>
                            </>
                        ) :
                            <>

                                <li className='py-2'>
                                    <NavLink to={'/cart'} className='relative mx-4 py-2 text-lg text-slate-900 font-light cursor-pointer'>
                                        <i className="fa-solid fa-cart-shopping fa-xl"></i>

                                        {cart?.numOfCartItems > 0 && (
                                            <span className='bg-green-600 text-white text-xs font-bold absolute rounded-full w-5 h-5 flex items-center justify-center top-[-8px] right-[-5px]'>
                                                {cart.numOfCartItems}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>

                                <li onClick={() => { logOut(); handleLinkClick(); }} className='py-2'>
                                    <span className='mx-4 py-2 text-md text-slate-900 font-light cursor-pointer'> Logout</span>
                                </li>

                            </>
                        }

                        <li className='flex items-center mt-4 lg:mt-0 pt-4 lg:pt-0 lg:pl-4'>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-slate-900 hover:text-green-600 transition-colors">
                                <i className='fab fa-facebook-f fa-md'></i>
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-slate-900 hover:text-green-600 transition-colors">
                                <i className='fab fa-tiktok fa-md'></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-slate-900 hover:text-green-600 transition-colors">
                                <i className='fab fa-youtube fa-md'></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-slate-900 hover:text-green-600 transition-colors">
                                <i className='fab fa-instagram fa-md'></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-slate-900 hover:text-green-600 transition-colors">
                                <i className='fab fa-twitter fa-md'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}