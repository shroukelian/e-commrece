import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/userContext';

export default function Login() {
    let navigate = useNavigate();
    let { setUserLogin } = useContext(UserContext);
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // استخدام async/await مع try/catch لتحسين التعامل مع الأخطاء
    async function handleLogin(formValues) {
        setIsLoading(true);
        setApiError(''); // إعادة تعيين الخطأ عند كل محاولة جديدة
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues);
            if (data.message === 'success') {
                localStorage.setItem('userToken', data.token);
                setUserLogin(data.token);
                navigate('/');
            }
        } catch (error) {
            setApiError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        // الخطوة 1: تعديل الـ div الأب لتوسيط المحتوى وحل مشكلة الفوتر
        <div className=" flex items-center justify-center p-9">
            <div className='w-full max-w-lg'>
                {apiError && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        {apiError}
                    </div>
                )}

                <h2 className='text-3xl font-bold mb-8 text-green-600'>Login Now</h2>
                
                {/* الخطوة 2: استخدام تصميم الفورم الأصلي بتاعك */}
                <form onSubmit={formik.handleSubmit}>
                    
                    {/* حقل الإيميل */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            id='email'
                            type="email"
                            name="email"
                            {...formik.getFieldProps('email')}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Your Email address:
                        </label>
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-xs -mt-2 mb-4">{formik.errors.email}</p>
                    ) : null}

                    {/* حقل كلمة السر */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            id='password'
                            type="password"
                            name="password"
                            {...formik.getFieldProps('password')}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Your Password:
                        </label>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500 text-xs -mt-2 mb-4">{formik.errors.password}</p>
                    ) : null}

                    {/* زر الدخول ورابط التسجيل */}
                    <div className='flex flex-wrap items-center gap-4'>
                        <button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-green-300">
                            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
                        </button>
                        <p className='text-sm text-gray-600'>
                            Didn't have an account yet?{' '}
                            <NavLink to={'/register'} className='font-semibold text-green-700 hover:underline'>
                                Register Now
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}