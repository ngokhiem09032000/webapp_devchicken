import React, { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import { getMyInfo } from '../../services/apiService';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
import { castDate, convertVnd } from '../tool/toolAll';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { getItems } from '../../services/serviceOrder';
import OrderDetailPopup from './OrderDetailPopup';


const AccountPage = () => {

    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const navigate = useNavigate(); // Hook để điều hướng
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const rs = await getMyInfo();
            if (rs) {
                setUser(rs.result);

                const ordersObj = await getItems(rs.result.userName);
                setOrders(ordersObj.result);
                return;
            }
            setUser(null);
        } catch {
            setUser(null);
        }
    };

    return (
        <>
            {user ? <div className="xl:flex mx-5 mt-5 mb-5 p-4 border rounded shadow-lg">
                <div className='flex xl:hidden text-start p-4'>
                    <div className='flex items-center justify-center w-2/12'><RxAvatar size={50} /></div>
                    <div className='w-7/12'>
                        <div className='p-1 text-sm'>Email: {user.userName}</div>
                        <div className='p-1 text-sm'>Họ và tên: {user.fullName}</div>
                        <div className='p-1 text-sm'>Ngày sinh: {castDate(user.birthDate || '')}</div>
                    </div>
                    <div className='w-3/12 flex items-center justify-center'>
                        <div className='space-y-1'>
                            <div className='text-sm underline hover:text-gray-400'>
                                <span>Đổi mật khẩu</span>
                            </div>
                            <div className='text-sm underline hover:text-gray-400' onClick={() => {
                                localStorage.removeItem("authToken");
                                navigate("/Home");
                            }}>
                                <span>Đăng xuất</span>
                            </div>
                        </div>
                    </div>
                    <div className=''>

                    </div>
                </div>
                <div className='xl:w-3/4 p-4'>
                    <div className='flex space-x-1 justify-center p-4'>
                        <div className='text-3xl font-medium'>Đơn hàng</div>
                        {orders.length > 0 && <div className='w-6 h-6 border rounded-full flex justify-center items-center text-white bg-black'>{orders.length}</div>}
                    </div>
                    <div className='hidden lg:block'>
                        <hr />
                        <div className='flex p-4'>
                            <div className='w-2/12 text-start font-medium'>Đơn hàng</div>
                            <div className='w-2/12 text-start font-medium'>Ngày</div>
                            <div className='w-3/12 text-start font-medium'>Trạng thái thanh toán</div>
                            <div className='w-3/12 text-start font-medium'>Tình trạng đơn hàng</div>
                            <div className='w-2/12 text-start font-medium'>Tổng</div>
                        </div>
                        {orders && orders.map((item, index) => (
                            <div key={index} className={`hover:bg-gray-200 ${index % 2 ? "bg-gray-50" : "bg-white"}`} onClick={() => {
                                setOrderDetail(item);
                                setIsPopupOpen(true);
                            }}>
                                <hr />
                                <div className='flex p-4'>
                                    <div className='w-2/12 text-start'>{index + 1}</div>
                                    <div className='w-2/12 text-start'>{castDate(item.createdAt)}</div>
                                    <div className='w-3/12 text-start'>{item.statusPay === 0 ? "Đang chờ xử lý" : "Đã thanh toán"}</div>
                                    <div className='w-3/12 text-start'>{item.statusOrder === 0 ? "Chưa thực hiện" : item.statusOrder === 1 ? "Đang giao hàng" : "Đã giao thành công"}</div>
                                    <div className='w-2/12 text-start'>{convertVnd(item.total)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='lg:hidden'>
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            {orders && orders.map((item, index) => (
                                <div key={index} className={`border m-1 p-3 rounded-md hover:bg-gray-200 bg-gray-50`} onClick={() => {
                                    setOrderDetail(item);
                                    setIsPopupOpen(true);
                                }}>
                                    <div className='text-start text-sm font-medium'>Đơn hàng: <span className='font-sans text-sm text-gray-500'>{index + 1}</span></div>
                                    <div className='text-start text-sm font-medium'>Ngày: <span className='font-sans text-sm text-gray-500'>{castDate(item.createdAt)}</span></div>
                                    <div className='text-start text-sm font-medium'>Trạng thái thanh toán: <span className='font-sans text-sm text-gray-500'>{item.statusPay === 0 ? "Đang chờ xử lý" : "Đã thanh toán"}</span></div>
                                    <div className='text-start text-sm font-medium'>Tình trạng đơn hàng: <span className='font-sans text-sm text-gray-500'>{item.statusOrder === 0 ? "Chưa thực hiện" : item.statusOrder === 1 ? "Đang giao hàng" : "Đã giao thành công"}</span></div>
                                    <div className='text-start text-sm font-medium'>Tổng: <span className='font-sans text-sm text-gray-500'>{convertVnd(item.total)}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='hidden xl:block xl:w-1/4 text-start p-4'>
                    <RxAvatar size={150} />
                    <div className='hidden xl:block'>
                        <div className='p-5 text-xl'>Email: {user.userName}</div>
                        <div className='p-5 text-xl'>Họ và tên: {user.fullName}</div>
                        <div className='p-5 text-xl'>Ngày sinh: {castDate(user.birthDate || '')}</div>
                        <button type='button' className="w-48 m-3 p-3 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
                            onClick={() => {
                                localStorage.removeItem("authToken");
                                navigate("/Home");
                            }}>
                            <div className='flex justify-center items-center'>
                                <LiaExchangeAltSolid size={30} className='mr-2' />
                                <span>Đổi mật khẩu</span>
                            </div>
                        </button>
                        <div>
                            <button type='button' className="w-48 m-3 p-3 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
                                onClick={() => {
                                    localStorage.removeItem("authToken");
                                    navigate("/Home");
                                }}>
                                <div className='flex justify-center items-center'>
                                    <CiLogout size={30} className='mr-2' />
                                    <span>Đăng xuất</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <OrderDetailPopup module={orderDetail} isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}></OrderDetailPopup>
            </div>
                : <div>
                    <LoginPage></LoginPage>
                </div>}
        </>
    );
};

export default AccountPage;