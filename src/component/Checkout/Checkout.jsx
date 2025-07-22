import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Checkout() {
    const { checkOut, cart } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    
    // دالة الدفع
    async function handleCheckout(values) {
        if (!cart?.data?._id) {
            toast.error("Your cart seems to be empty.");
            return;
        }

        setIsLoading(true);
        // استخدام window.location.origin عشان يبقى ديناميكي
let response = await checkOut(cart.data._id, `${window.location.origin}/e-commrece`, values);        
        if (response?.data?.status === 'success') {
            window.location.href = response.data.session.url;
        } else {
            toast.error("Could not proceed to payment. Please try again.");
            setIsLoading(false);
        }
    }

    // التحقق من صحة البيانات
    const validationSchema = Yup.object({
        details: Yup.string().required('Address details are required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number').required('Phone number is required'),
        city: Yup.string().required('City is required'),
    });

    // إعدادات Formik
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        validationSchema,
        onSubmit: handleCheckout
    });

    return (
        // الخطوة 1: استخدام Flexbox لتوسيط المحتوى في الصفحة
        <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className='w-full max-w-md'>
                <h2 className='text-3xl font-bold mb-8 text-center text-green-600'>Shipping Details</h2>
                
                {/* الخطوة 2: استخدام تصميم الفورم الأصلي بتاعك */}
                <form onSubmit={formik.handleSubmit} className="space-y-8">

                    {/* حقل التفاصيل */}
                    <div className="relative z-0 w-full group">
                        <input 
                            id='details' 
                            type="text" 
                            name="details" 
                            {...formik.getFieldProps('details')}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="details" 
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Address Details:
                        </label>
                        {formik.touched.details && formik.errors.details ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.details}</p>
                        ) : null}
                    </div>

                    {/* حقل رقم الهاتف */}
                    <div className="relative z-0 w-full group">
                        <input 
                            id='phone' 
                            type="tel" 
                            name="phone" 
                            {...formik.getFieldProps('phone')}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="phone" 
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone Number:
                        </label>
                        {formik.touched.phone && formik.errors.phone ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                        ) : null}
                    </div>

                    {/* حقل المدينة */}
                    <div className="relative z-0 w-full group">
                        <input 
                            id='city' 
                            type="text" 
                            name="city" 
                            {...formik.getFieldProps('city')}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="city" 
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            City:
                        </label>
                        {formik.touched.city && formik.errors.city ? (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
                        ) : null}
                    </div>

                    {/* زر الدفع */}
                    <button 
                        type="submit" 
                        disabled={isLoading || !formik.isValid}
                        className="w-full btn text-lg disabled:bg-green-300"
                    >
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
}