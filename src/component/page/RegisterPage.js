import React, { useState } from 'react';
import { PiTrademarkRegisteredLight } from 'react-icons/pi';
import Required from '../element/Required';
import { create } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        fullName: "",
        passWord: "",
        rePassWord: "",
        birthDate: "",
    });

    const [errors, setErrors] = useState({});

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

        if (!formData.passWord || formData.passWord.length < 6) {
            formErrors.passWord = "Mật khẩu phải dài ít nhất 6 ký tự";
        }

        if (formData.passWord !== formData.rePassWord) {
            formErrors.rePassWord = "Mật khẩu nhập lại không khớp";
        }

        if (!formData.birthDate) {
            formErrors.birthDate = "Ngày sinh là bắt buộc";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const rs = await create(formData);
            if (rs && rs.code === 1000) {
                alert("Đăng ký thành công");
                navigate("/home");
            } else {
                if (rs && rs.message) {
                    alert(rs.message);
                    return;
                }
                alert("Đăng ký thất bại");
            }
        }
    };

    return (
        <div className="flex p-5">
            {/* Nửa bên phải không có background */}
            <div className="w-full flex items-center justify-center">
                <div className="w-1/2 p-8 pt-4 border rounded shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Đăng ký
                    </h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Email <Required></Required></label>
                            <input
                                id='userName'
                                name='userName'
                                type="email"
                                className={`w-full p-2 border rounded ${errors.userName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.userName ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập email của bạn"
                                value={formData.userName}
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
                                onChange={handleInputChange}
                            />
                            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Mật khẩu <Required></Required></label>
                            <input
                                id="passWord"
                                name="passWord"
                                type="password"
                                className={`w-full p-2 border rounded ${errors.passWord ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.passWord ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập mật khẩu"
                                value={formData.passWord}
                                onChange={handleInputChange}
                            />
                            {errors.passWord && <p className="text-sm text-red-500 mt-1">{errors.passWord}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-text mb-2">Nhập lại mật khẩu <Required></Required></label>
                            <input
                                id="rePassWord"
                                name="rePassWord"
                                type="password"
                                className={`w-full p-2 border rounded ${errors.rePassWord ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.rePassWord ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                placeholder="Nhập mật khẩu"
                                value={formData.rePassWord}
                                onChange={handleInputChange}
                            />
                            {errors.rePassWord && <p className="text-sm text-red-500 mt-1">{errors.rePassWord}</p>}
                        </div>
                        <div className="mb-5">
                            <label className="block text-text mb-2">Ngày sinh <Required></Required></label>
                            <input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                className={`w-full p-2 border rounded ${errors.dob ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${errors.dob ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                            {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950 mb-3"
                        >
                            <div className='flex justify-center items-center'>
                                <PiTrademarkRegisteredLight size={30} className='mr-2' />
                                <span>Đăng ký</span>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;