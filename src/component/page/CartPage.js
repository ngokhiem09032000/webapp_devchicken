import React, { useContext, useEffect, useState } from 'react';
import { MdOutlinePayments } from 'react-icons/md';
import AmountBox from '../element/AmountBox';
import ItemCartProduct from '../element/ItemCartProduct';
import { useNavigate } from 'react-router-dom';
import { searchItemsByIds } from '../../services/serviceProduct';
import { cartTitle, shippingFee } from '../../services/apiService';
import { calculateAmount, calculatePriceAll, convertVnd } from '../tool/toolAll';
import { GlobalContext } from '../element/GlobalContext';
import AmountBoxSmall from '../element/AmountBoxSmall';

const CartPage = () => {

    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

    // AmountBox
    const max = 999999;
    const min = 1;
    // AmountBox

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
            } else {
                setModules([]);
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

    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <div className="mx-5 mt-5 mb-5 p-4 border rounded shadow-lg">
            <div className='text-3xl text-center font-bold'>
                Giỏ Hàng
            </div>
            <div className='xl:flex p-5'>
                <div className='w-1/12 hidden xl:block'></div>
                <div className='w-full xl:w-7/12'>
                    <hr></hr>
                    <div className='flex font-bold my-3'>
                        <div className='w-9/12 lg:w-5/12'>Sản phẩm</div>
                        <div className='w-3/12 text-center'>Số lượng</div>
                        <div className='w-2/12 hidden lg:block'>Tổng</div>
                        <div className='w-2/12 hidden lg:block'>SL tồn</div>
                    </div>
                    {modules && modules.map((item, index) => (
                        <div key={index}>
                            <hr></hr>
                            <div className='flex font-bold my-3 justify-center items-center'>
                                <div className='w-9/12 lg:w-5/12'>
                                    <ItemCartProduct name={item.name} price={item.price} imageUrl={item.imageUrl} color={item.color} size={item.size} viewItem={() => {
                                        navigate("/product/" + item.id);
                                    }}></ItemCartProduct>
                                    <div className='lg:hidden'>Tổng: {convertVnd(item.totalPrice)}</div>
                                    <div className={`${item.amount > item.stock ? "text-red-500" : "text-black"} lg:hidden`}>SL tồn: {item.stock} áo</div>
                                </div>
                                <div className='w-3/12 text-center '>
                                    <div className='inline-flex'>
                                        <div className='hidden xl:block'>
                                            <AmountBox error={item.amount > item.stock} value={item.amount} min={min} max={max} handleChange={(e) => {
                                                const inputValue = e.target.value;
                                                const cart = JSON.parse(localStorage.getItem(cartTitle));
                                                if (inputValue === '' || parseFloat(inputValue) > max || parseFloat(inputValue) < min) {
                                                    const updatedList = cart.map(itemA => {
                                                        if (itemA.id === item.id && itemA.size === item.size) {
                                                            return {
                                                                ...itemA,
                                                                amount: min,
                                                                totalPrice: item.price * min
                                                            }
                                                        }
                                                        return itemA; // Giữ nguyên đối tượng nếu không trùng id
                                                    });
                                                    localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                                                    let amount = calculateAmount(updatedList);
                                                    setGlobalVariable(amount);
                                                    fetchModules();
                                                    return;
                                                }

                                                if (Number.isInteger(parseFloat(inputValue))) {
                                                    const updatedList = cart.map(itemA => {
                                                        if (itemA.id === item.id && itemA.size === item.size) {
                                                            return {
                                                                ...itemA,
                                                                amount: parseInt(inputValue),
                                                                totalPrice: item.price * parseInt(inputValue)
                                                            }
                                                        }
                                                        return itemA; // Giữ nguyên đối tượng nếu không trùng id
                                                    });
                                                    localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                                                    let amount = calculateAmount(updatedList);
                                                    setGlobalVariable(amount);
                                                    fetchModules();
                                                    return; // Nếu input là rỗng, trả về min, 
                                                }

                                            }} increaseValue={() => {
                                                const cart = JSON.parse(localStorage.getItem(cartTitle));
                                                if (item.amount < max) {
                                                    const updatedList = cart.map(itemA => {
                                                        if (itemA.id === item.id && itemA.size === item.size) {
                                                            return {
                                                                ...itemA,
                                                                amount: itemA.amount + 1,
                                                                totalPrice: item.price * (itemA.amount + 1)
                                                            }
                                                        }
                                                        return itemA; // Giữ nguyên đối tượng nếu không trùng id
                                                    });
                                                    localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                                                    let amount = calculateAmount(updatedList);
                                                    setGlobalVariable(amount);
                                                    fetchModules();
                                                }
                                            }} decreaseValue={() => {
                                                const cart = JSON.parse(localStorage.getItem(cartTitle));
                                                const updatedList = cart.map(itemA => {
                                                    if (itemA.id === item.id && itemA.size === item.size) {
                                                        return {
                                                            ...itemA,
                                                            amount: (itemA.amount > 1 ? itemA.amount - 1 : 1),
                                                            totalPrice: item.price * (itemA.amount > 1 ? itemA.amount - 1 : 1)
                                                        }
                                                    }
                                                    return itemA; // Giữ nguyên đối tượng nếu không trùng id
                                                });
                                                localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                                                let amount = calculateAmount(updatedList);
                                                setGlobalVariable(amount);
                                                fetchModules();
                                            }}></AmountBox>
                                        </div>
                                        <div className='xl:hidden'>
                                            <AmountBoxSmall error={item.amount > item.stock} value={item.amount} min={min} max={max} handleChange={(e) => {
                                                const inputValue = e.target.value;
                                                const cart = JSON.parse(localStorage.getItem(cartTitle));
                                                if (inputValue === '' || parseFloat(inputValue) > max || parseFloat(inputValue) < min) {
                                                    const updatedList = cart.map(itemA => {
                                                        if (itemA.id === item.id && itemA.size === item.size) {
                                                            return {
                                                                ...itemA,
                                                                amount: min,
                                                                totalPrice: item.price * min
                                                            }
                                                        }
                                                        return itemA; // Giữ nguyên đối tượng nếu không trùng id
                                                    });
                                                    localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                                                    let amount = calculateAmount(updatedList);
                                                    setGlobalVariable(amount);
                                                    fetchModules();
                                                    return;
                                                }

                                                if (Number.isInteger(parseFloat(inputValue))) {
                                                    const updatedList = cart.map(itemA => {
                                                        if (itemA.id === item.id && itemA.size === item.size) {
                                                            return {
                                                                ...itemA,
                                                                amount: parseInt(inputValue),
                                                                totalPrice: item.price * parseInt(inputValue)
                                                            }
                                                        }
                                                        return itemA; // Giữ nguyên đối tượng nếu không trùng id
                                                    });
                                                    localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                                                    let amount = calculateAmount(updatedList);
                                                    setGlobalVariable(amount);
                                                    fetchModules();
                                                    return; // Nếu input là rỗng, trả về min, 
                                                }

                                            }}></AmountBoxSmall>
                                        </div>
                                    </div>
                                    <div className='cursor-pointer text-gray-500 hover:text-red-500' onClick={() => {
                                        const cart = JSON.parse(localStorage.getItem(cartTitle));
                                        const cartNew = cart.filter(nameItem => (nameItem.id !== item.id || nameItem.size !== item.size));
                                        localStorage.setItem(cartTitle, JSON.stringify(cartNew));
                                        let amount = calculateAmount(cartNew);
                                        setGlobalVariable(amount);
                                        fetchModules();
                                    }}>
                                        xóa
                                    </div>
                                </div>
                                <div className='w-2/12 hidden lg:block'>{convertVnd(item.totalPrice)}</div>
                                <div className={`w-2/12 ${item.amount > item.stock ? "text-red-500" : "text-black"} hidden lg:block`}>{item.stock} áo</div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='w-1/12 hidden xl:block'></div>
                <form className='w-full xl:w-3/12 h-96 border border-gray-200 rounded-lg'>
                    <div className='flex p-3'>
                        <div className='w-1/2 text-xl'>
                            Phí vận chuyển
                        </div>
                        <div className='w-1/2 text-xl text-end'>
                            {convertVnd(shippingFee)}
                        </div>
                    </div>
                    <div className='flex p-3'>
                        <div className='w-1/2 text-2xl font-bold'>
                            Tổng cộng
                        </div>
                        <div className='w-1/2 text-2xl font-bold text-end'>
                            {convertVnd(calculatePriceAll(modules, shippingFee))}
                        </div>
                    </div>
                    <div className='p-2 w-full'>
                        <label>Ghi chú</label>
                        <textarea type='text' className='w-full border rounded-lg' rows={6}></textarea>
                    </div>
                    <div className='p-2 w-full'>
                        <button type='button' className="w-full p-3 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
                            onClick={async () => {
                                const dataValid = await fetchModules(true);
                                const isValid = valid(dataValid);
                                if (isValid) {
                                    navigate("/pay");
                                }
                            }}>
                            <div className='flex justify-center items-center'>
                                <MdOutlinePayments size={30} className='mr-2' />
                                <span>Thanh toán</span>
                            </div>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CartPage;