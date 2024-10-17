import React, { } from 'react';
import { calculatePriceAll, calculatePriceAllNoShip, castDate, convertVnd } from '../tool/toolAll';
import ItemCartProduct from '../element/ItemCartProduct';
import { FaAddressCard } from 'react-icons/fa';

const OrderDetailPage = ({ module, onClose }) => {

    return (
        <div className="bg-white p-6 rounded-md shadow-lg">
            <div className='flex p-3'>
                <div className='w-1/4'>
                    <button
                        type="button"
                        className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-white hover:text-blue-950 border border-blue-950"
                        onClick={onClose}
                    >
                        Trở về
                    </button>
                </div>
                <div className='w-1/2'>
                    <h2 className="text-2xl font-bold mb-1 text-center">Chi tiết đơn hàng</h2>
                    <h2 className="text-md font-md mb-4 text-center">Ngày: {castDate(module.createdAt || '')}</h2>
                </div>
                <div className='w-1/4'></div>
            </div>

            <div className='xl:flex'>
                <div className='hidden md:block xl:w-8/12 p-3'>
                    <hr />
                    <div className='flex p-4'>
                        <div className='w-6/12 text-start font-medium'>Sản phẩm</div>
                        <div className='w-6/12 text-start font-medium'>Số lượng</div>
                        <div className='w-3/12 text-start font-medium'>Tổng</div>
                    </div>
                    <hr />
                    {module.orderDetails && module.orderDetails.map((item, index) => (
                        <div key={index} className='flex p-4'>
                            <div className='w-6/12 text-start font-medium'><ItemCartProduct name={item.name} price={item.price} imageUrl={item.imageUrl} color={item.color} size={item.size}></ItemCartProduct></div>
                            <div className='w-6/12 text-start font-medium flex items-center'>{item.amount} áo</div>
                            <div className='w-3/12 text-start font-medium flex items-center'>{convertVnd(item.totalPrice)}</div>
                        </div>
                    ))}
                    <hr />
                </div>
                <div className='block md:hidden p-3'>
                    {module.orderDetails && module.orderDetails.map((item, index) => (
                        <div key={index}>
                            <hr />
                            <div className='flex p-4'>
                                <div className='w-full text-start font-medium'>
                                    <ItemCartProduct name={item.name} price={item.price} imageUrl={item.imageUrl} color={item.color} size={item.size}></ItemCartProduct>
                                    <div>Số lượng: {item.amount} áo</div>
                                    <div>Tổng: {convertVnd(item.totalPrice)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>
                <div className='xl:w-4/12 p-3'>
                    <div className='flex p-1 md:p-3'>
                        <div className='w-1/2 text-md md:text-xl'>
                            Phí vận chuyển
                        </div>
                        <div className='w-1/2 text-md md:text-xl text-end'>
                            {convertVnd(module.shippingFee)}
                        </div>
                    </div>
                    <div className='flex p-1 md:p-3'>
                        <div className='w-1/2 text-md md:text-xl'>
                            Tổng
                        </div>
                        <div className='w-1/2 text-md md:text-xl text-end'>
                            {convertVnd(calculatePriceAllNoShip(module.orderDetails))}
                        </div>
                    </div>
                    <div className='flex p-1 md:p-3'>
                        <div className='w-1/2 text-xl md:text-2xl font-bold'>
                            Tổng cộng
                        </div>
                        <div className='w-1/2 text-xl md:text-2xl font-bold text-end'>
                            {convertVnd(calculatePriceAll(module.orderDetails, module.shippingFee))}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:block md:space-x-2 xl:space-x-0 md:space-y-0 space-y-2'>
                        <div className='border rounded p-3 xl:my-2 xl:w-full'>
                            <div className='p-3'>
                                <div className='w-full text-start font-bold flex items-center space-x-2'>
                                    <FaAddressCard size={30} /><div>Địa chỉ thanh toán</div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <div className='w-full text-start'>
                                    <div>{module.fullName}</div>
                                    <div>{module.address}</div>
                                    <div>{module.phone}</div>
                                </div>
                            </div>
                        </div>
                        <div className='border rounded p-3 xl:w-full'>
                            <div className='p-3'>
                                <div className='w-full text-start font-bold flex items-center space-x-2'>
                                    <FaAddressCard size={30} /><div>Địa chỉ giao hàng</div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <div className='w-full text-start'>
                                    <div>{module.fullName}</div>
                                    <div>{module.address}</div>
                                    <div>{module.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
