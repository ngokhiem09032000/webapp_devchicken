import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartTitle, getMyInfo, orderDetailsTitle, orderTitle, shippingFee } from '../../services/apiService';
import { searchItemsByIds, updateStock } from '../../services/serviceProduct';
import { calculatePriceAll, convertVnd } from '../tool/toolAll';
import Required from '../element/Required';
import { SiTruenas } from 'react-icons/si';
import { FaCcJcb, FaCcVisa } from 'react-icons/fa';
import { RiBankCardFill } from 'react-icons/ri';
import { create } from '../../services/serviceOrder';
import { GlobalContext } from '../element/GlobalContext';

const PayPage = () => {

    const [modules, setModules] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        fullName: "",
        address: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [selectedPayment, setSelectedPayment] = useState("payment2");
    const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

    const fetchModules = async (isValid) => { // isValid là hành động check valid
        try {
            const cartData = JSON.parse(localStorage.getItem(cartTitle));
            const ids = cartData.map(item => item.id);
            const data = await searchItemsByIds(ids);
            if (data && data.code === 1000 && data.result) {
                const mergedList = cartData.map(item => {
                    const nameObject = data.result.find(nameItem => (nameItem.id === item.id));

                    const sizeObject = nameObject.sizes.find(sizeItem => (sizeItem.id.name === item.size));
                    const variableAmount = item && item.amount ? item.amount : 0;
                    return {
                        ...nameObject,
                        amount: variableAmount,
                        size: item.size,
                        totalPrice: nameObject.price * variableAmount,
                        stock: sizeObject.stock
                    };
                });
                setModules(mergedList);

                if (isValid)
                    return mergedList;
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    const valid = (dataValid) => {
        let strError = "";
        for (let i = 0; i < dataValid.length; i++) {
            if (dataValid[i].amount > dataValid[i].stock) {
                strError = strError + dataValid[i].name + " / size: " + dataValid[i].size + " ; ";
            }
        }
        if (strError) {
            alert(strError + " đã vượt quá số lượng tồn.");
            return false;
        }
        return true;
    };

    const loadUser = async () => {
        try {
            const rs = await getMyInfo();
            if (rs) {
                setUser(rs.result);
                setFormData({
                    ...formData,
                    userName: rs.result.userName,
                    fullName: rs.result.fullName || '',
                    address: "",
                    phone: ""
                });
                return;
            }
            setUser(null);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchModules();
        loadUser();
    }, []);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.userName) {
            formErrors.userName = "Email là bắt buộc";
        } else if (!validateEmail(formData.userName)) {
            formErrors.userName = "Định dạng email không hợp lệ";
        }

        if (!formData.fullName || formData.fullName.length < 6) {
            formErrors.fullName = "Họ và tên phải dài ít nhất 6 ký tự";
        }

        if (!formData.address) {
            formErrors.address = "Địa chỉ là bắt buộc";
        }

        if (!formData.phone) {
            formErrors.phone = "Số điện thoại là bắt buộc";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPayment === "payment1") {
            alert("Chức năng thanh toán bằng 2C2P chưa hoàn thiện.");
            return;
        }
        if (validateForm()) {
            const orderObj = {
                ...formData, shippingFee: shippingFee, total: calculatePriceAll(modules, shippingFee),
                statusOrder: 0, statusPay: 0
            }
            sessionStorage.setItem(orderTitle, JSON.stringify(orderObj));
            sessionStorage.setItem(orderDetailsTitle, JSON.stringify(modules));


            const orderCreate = {
                info: orderObj,
                detailOrders: modules,
            }
            create(orderCreate);
            updateStock(modules);
            localStorage.removeItem(cartTitle);
            setGlobalVariable(0);
            navigate('/complete');
        }
    };

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.id);
    };

    return (
        <div className="block lg:flex">
            {/* Phần Trái - Cuộn */}
            <div className="w-full lg:w-7/12 p-10 bg-white flex">
                <div className='hidden lg:w-1/6 lg:block'></div>
                <div className='w-full lg:w-5/6'>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <div className='flex'>
                                <label className="block text-text mb-2 w-1/2">Email <Required></Required></label>
                                {user ? <div className='w-1/2 text-end'>
                                    <Link className='hover:text-gray-400 underline decoration-1' onClick={() => {
                                        localStorage.removeItem("authToken");
                                        setUser(null);
                                        setFormData({
                                            userName: "",
                                            fullName: "",
                                            address: "",
                                            phone: "",
                                            birthDate: "",
                                        });
                                    }}>Đăng xuất</Link>
                                </div> : <div className='w-1/2 text-end'>
                                    <Link className='hover:text-gray-400 underline decoration-1' to="/account">Đăng nhập</Link>
                                </div>}
                            </div>

                            <input
                                id='userName'
                                name='userName'
                                type="email"
                                className={`w-full p-2 border rounded ${errors.userName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.userName ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập email của bạn"
                                value={formData.userName}
                                disabled={user && user.userName}
                                onChange={handleInputChange}
                            />
                            {errors.userName && <p className="text-sm text-red-500 mt-1">{errors.userName}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Họ và tên <Required></Required></label>
                            <input
                                id='fullName'
                                name='fullName'
                                type="text"
                                className={`w-full p-2 border rounded ${errors.fullName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.fullName ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập họ và tên của bạn"
                                value={formData.fullName}
                                disabled={user && user.fullName}
                                onChange={handleInputChange}
                            />
                            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Địa chỉ <Required></Required></label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className={`w-full p-2 border rounded ${errors.address ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.address ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập địa chỉ"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Số điện thoại <Required></Required></label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className={`w-full p-2 border rounded ${errors.phone ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.phone ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập mật khẩu"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Phương thức vận chuyển</label>
                            <div className='flex p-2 border rounded bg-gray-100'>
                                <div className='w-1/12 flex items-center justify-center'>
                                    <input
                                        id=""
                                        name=""
                                        type="radio"
                                        value=""
                                        defaultChecked
                                        className="h-5 w-5"
                                    />
                                </div>
                                <div className='w-8/12 flex items-center justify-start'>Giao hàng tiết kiệm</div>
                                <div className='w-3/12 flex items-center justify-end'>{convertVnd(30000)}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Hình thức thanh toán</label>

                            {/* Option 1 */}
                            <div className='flex p-2 border rounded-t bg-gray-100'>
                                <div className='w-1/12 flex items-center justify-center'>
                                    <input
                                        id="payment1"
                                        name="payment"
                                        type="radio"
                                        className="h-5 w-5"
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                                <div className='w-8/12 flex items-center justify-start'>2C2P</div>
                                <div className='w-3/12 flex items-center justify-end'>
                                    <RiBankCardFill size={25} className='mr-1' />
                                    <FaCcVisa size={25} className='mr-1' />
                                    <FaCcJcb size={25} />
                                </div>
                            </div>
                            <div className={`transition-height duration-700 ease-in-out overflow-hidden ${selectedPayment === "payment1" ? "max-h-32" : "max-h-0"}`}>
                                <div className='flex p-2 border bg-white'>
                                    <div className='w-full flex items-center justify-center'>
                                        Chức năng chưa hoàn thiện
                                    </div>
                                </div>
                            </div>
                            <div className='flex p-2 border rounded-b bg-gray-100'>
                                <div className='w-1/12 flex items-center justify-center'>
                                    <input
                                        id="payment2"
                                        name="payment"
                                        type="radio"
                                        className="h-5 w-5"
                                        defaultChecked
                                        onChange={handlePaymentChange}
                                    />
                                </div>
                                <div className='w-8/12 flex items-center justify-start'>
                                    Thanh toán khi nhận hàng (COD)
                                </div>
                                <div className='w-3/12 flex items-center justify-end'></div>
                            </div>
                            <div className={`transition-height duration-300 ease-in-out overflow-hidden ${selectedPayment === "payment2" ? "max-h-32" : "max-h-0"}`}>
                                <div className='flex p-2 border bg-white'>
                                    <div className='w-full flex items-center justify-center'>
                                        Thanh toán khi nhận hàng (COD)
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="hidden lg:block w-full py-2 px-4 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950 mb-3"
                        >
                            <div className='flex justify-center items-center'>
                                <span>Hoàn tất hóa đơn</span>
                            </div>
                        </button>
                    </form>
                </div>
            </div>

            {/* Phần Phải - Cố Định */}
            <div className="w-full lg:w-5/12 bg-gray-100 border-gray-300">
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
                    <div className="p-2 flex">
                        <div className='w-3/4 pr-2'>
                            <input type="text" className='w-full border border-gray-300 rounded-md flex justify-center items-center p-3' placeholder='Mã giảm giá' />
                        </div>
                        <div className='w-1/4 border border-gray-300 rounded-md flex justify-center items-center p-3 bg-blue-950 text-white hover:bg-white hover:text-blue-950'>
                            <button type='button'>Áp dụng</button>
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className='flex pb-2'>
                            <div className='w-1/2 text-xl'>
                                Phí vận chuyển
                            </div>
                            <div className='w-1/2 text-xl text-end'>
                                {convertVnd(shippingFee)}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-1/2 text-2xl font-bold'>
                                Tổng cộng
                            </div>
                            <div className='w-1/2 text-2xl font-bold text-end'>
                                {convertVnd(calculatePriceAll(modules, shippingFee))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="lg:hidden w-full py-2 px-4 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950 mb-3"
                        onClick={handleSubmit}
                    >
                        <div className='flex justify-center items-center'>
                            <span>Hoàn tất hóa đơn</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayPage;