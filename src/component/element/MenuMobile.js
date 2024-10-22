import React, { useContext } from 'react';
import { FaCartArrowDown, FaHome, FaProductHunt, FaUser } from 'react-icons/fa';
import { GlobalContext } from './GlobalContext';

const MenuMobile = (props) => {

    const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white text-blue-950 border-t border-blue-950 py-4 block lg:hidden z-50">
            <div className='grid grid-cols-4 place-items-center'>
                <div className='hover:text-blue-600 cursor-pointer' onClick={props.onHome}>
                    <div className='flex justify-center'><FaHome size={20} /></div>
                    <div className='text-sm'>Trang chủ</div>
                </div>
                <div className='hover:text-blue-600 cursor-pointer' onClick={props.onProduct}>
                    <div className='flex justify-center'><FaProductHunt size={20} /></div>
                    <div className='text-sm'>Sản phẩm</div>
                </div>
                <div className='hover:text-blue-600 cursor-pointer relative' onClick={props.onCart}>
                    <div className='flex justify-center'><FaCartArrowDown size={20} /></div>
                    <div className='text-sm'>Giỏ hàng</div>
                    {globalVariable > 0 && <div className="absolute -top-3 right-0 bg-red-500 rounded-full w-auto h-4 flex items-center justify-center p-1">
                        <span className="text-xs text-white">{globalVariable}</span>
                    </div>}
                </div>
                <div className='hover:text-blue-600 cursor-pointer' onClick={props.onAccount}>
                    <div className='flex justify-center'><FaUser size={20} /></div>
                    <div className='text-sm'>Tài khoản</div>
                </div>
            </div>
        </div>
    );
};

export default MenuMobile;