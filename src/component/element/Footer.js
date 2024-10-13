// src/components/Footer.js
import React from 'react';
import { TbBrandFacebook, TbBrandInstagram, TbBrandTiktok, TbBrandYoutube } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-4">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-xl font-bold mb-4">Về chúng tôi</h1>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Giới thiệu</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Điều khoản sử dụng</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Cơ hội việc làm</Link>
                        </div>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-xl font-bold mb-4">Hỗ trợ khách hàng</h1>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Chính sách đổi / hoàn trả</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Chính sách bảo hành</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Chính sách bảo mật</Link>
                        </div>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-xl font-bold mb-4">Phương thức thanh toán</h1>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">COD</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">ATM</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">VISA/MASTERCARD</Link>
                        </div>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-xl font-bold mb-4">Dịch vụ khách hàng</h1>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Mua hàng online: 09 99 99 9999</Link>
                        </div>
                        <div className='mb-1'>
                            <Link to="#" className="hover:text-gray-400">Góp ý, khiếu nại: 09 99 99 9999</Link>
                        </div>
                    </div>
                </div>
                <div className="my-10 flex justify-center space-x-4">
                    <a href="#" className="hover:text-gray-400"><TbBrandFacebook size={30} /></a>
                    <a href="#" className="hover:text-gray-400"><TbBrandYoutube size={30} /></a>
                    <a href="#" className="hover:text-gray-400"><TbBrandInstagram size={30} /></a>
                    <a href="#" className="hover:text-gray-400"><TbBrandTiktok size={30} /></a>
                </div>
                <div className="mt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} DEVCHICKEN</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
