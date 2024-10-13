import React, { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import { getMyInfo } from '../../services/apiService';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
import { castDate } from '../tool/toolAll';
import { LiaExchangeAltSolid } from 'react-icons/lia';


const AccountPage = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate(); // Hook để điều hướng

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const rs = await getMyInfo();
            if (rs) {
                setUser(rs.result);
                return;
            }
            setUser(null);
        } catch {
            setUser(null);
        }
    };

    return (
        <>
            {user ? <div className="flex mx-5 mt-5 mb-5 p-4 border rounded shadow-lg">
                <div className='w-1/4 flex justify-center items-center'>
                    <RxAvatar size={150} />
                </div>
                <div className='w-2/4'>
                    <div className='p-5 text-2xl'>Email: {user.userName}</div>
                    <div className='p-5 text-2xl'>Họ và tên: {user.fullName}</div>
                    <div className='p-5 text-2xl'>Ngày sinh: {castDate(user.birthDate || '')}</div>
                    <button type='button' className="m-3 p-3 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
                        onClick={() => {
                            localStorage.removeItem("authToken");
                            navigate("/Home");
                        }}>
                        <div className='flex justify-center items-center'>
                            <LiaExchangeAltSolid size={30} className='mr-2' />
                            <span>Đổi mật khẩu</span>
                        </div>
                    </button>
                </div>
                <div className='w-1/4 text-end'>
                    <div>
                        <button type='button' className="m-3 p-3 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
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
                : <div>
                    <LoginPage></LoginPage>
                </div>}
        </>
    );
};

export default AccountPage;