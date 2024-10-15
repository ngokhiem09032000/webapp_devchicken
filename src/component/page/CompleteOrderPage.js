import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderDetailsTitle, orderTitle, shippingFee } from '../../services/apiService';
import { calculatePriceAll, convertVnd } from '../tool/toolAll';

import { FaCheckCircle } from 'react-icons/fa';

const CompleteOrderPage = () => {


    const [modules, setModules] = useState([]);
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const orderData = JSON.parse(sessionStorage.getItem(orderTitle));
        const orderDetails = JSON.parse(sessionStorage.getItem(orderDetailsTitle));
        if (!orderData || !orderDetails) {
            navigate("/");
            return;
        }
        setCustomer(orderData);
        setModules(orderDetails);
    }, []);

    return (
        <div className="lg:flex">
            {/* Phần Trái - Cuộn */}
            <div className="lg:w-7/12 p-3 bg-white">
                <div className='flex lg:p-2'>
                    <div className='lg:w-1/6 flex items-center justify-end p-2 text-blue-950'><FaCheckCircle size={40} /></div>
                    <div className='lg:w-5/6 flex items-center justify-start text-2xl'>Cảm ơn {customer.fullName}!</div>
                </div>
                <div className='flex p-2'>
                    <div className='hidden lg:w-1/6 lg:block'></div>
                    <div className='w-full lg:w-5/6'>
                        <div className='border rounded p-2'>
                            <div className='p-3 text-xl'>Chi tiết đơn hàng</div>
                            <div className='flex p-3'>
                                <div className='w-1/2 text-start font-bold'>
                                    Thông tin liên hệ
                                </div>
                                <div className='w-1/2 text-end font-bold'>
                                    Phương thức thanh toán
                                </div>
                            </div>
                            <div className='flex px-3'>
                                <div className='w-1/2 text-start p-2'>
                                    {customer.userName}
                                </div>
                                <div className='w-1/2 text-end p-2'>
                                    Thanh toán khi nhận hàng (COD) - {convertVnd(calculatePriceAll(modules, shippingFee))}
                                </div>
                            </div>
                            <div className='flex p-3'>
                                <div className='w-1/2 text-start font-bold'>
                                    Địa chỉ vận chuyển
                                </div>
                                <div className='w-1/2 text-end font-bold'>
                                    Địa chỉ thanh toán
                                </div>
                            </div>
                            <div className='flex px-3'>
                                <div className='w-1/2 text-start p-2'>
                                    <div>{customer.fullName}</div>
                                    <div>{customer.address}</div>
                                    <div>{customer.phone}</div>
                                </div>
                                <div className='w-1/2 text-end p-2'>
                                    <div>{customer.fullName}</div>
                                    <div>{customer.address}</div>
                                    <div>{customer.phone}</div>
                                </div>
                            </div>
                            <div className='p-3 font-bold'>
                                Phương thức vận chuyển
                            </div>
                            <div className='px-3'>
                                Giao hàng tiết kiệm
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex p-2'>
                    <div className='hidden lg:w-1/6 lg:block'></div>
                    <div className='w-full lg:w-5/6 flex'>
                        <div className='w-1/2 cursor-pointer flex items-center'>
                            Bạn cần trợ giúp? Liên hệ với chúng tôi
                        </div>
                        <div className='w-1/2 text-end'>
                            <button className='border rounded text-white bg-blue-950 hover:text-blue-950 hover:bg-white p-5 text-center' onClick={
                                () => {
                                    navigate("/product");
                                }
                            }>
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần Phải - Cố Định */}
            <div className="lg:w-5/12 bg-gray-100 border-gray-300">
                <div className="p-4 sticky top-0">
                    {modules && modules.map((item, index) => (
                        <div key={index} className="flex p-2">
                            <div className="w-2/6 h-20 flex justify-center items-center border border-gray-300 bg-white rounded-md relative">
                                <img className="h-16 object-scale-down" src={item.imageUrl} alt="Product Image" />
                                <div className='absolute top-1 right-1 rounded-full w-6 h-6 text-white 
                                bg-slate-600 flex justify-center items-center text-sm'>{item.amount}</div>
                            </div>

                            <div className='w-3/6 mx-4 flex items-center'>
                                <div>
                                    <div className='text-sm w-full'>{item.name}</div>
                                    <div className='text-gray-500 text-sm'>{convertVnd(item.price)}</div>
                                    <div className='text-gray-500 text-sm'>
                                        <span>{item.color} / {item.size}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-3/6 mx-3 flex items-center justify-end'>
                                <div>
                                    {convertVnd(item.totalPrice)}
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr></hr>
                    <div className='p-2'>
                        <div className='flex py-2'>
                            <div className='w-1/2 text-xl'>
                                Phí vận chuyển
                            </div>
                            <div className='w-1/2 text-xl text-end'>
                                {convertVnd(shippingFee)}
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='p-2'>
                        <div className='flex py-2'>
                            <div className='w-1/2 text-2xl font-bold'>
                                Tổng cộng
                            </div>
                            <div className='w-1/2 text-2xl font-bold text-end'>
                                {convertVnd(calculatePriceAll(modules, shippingFee))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteOrderPage;