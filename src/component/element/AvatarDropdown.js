import React, { useState, useRef } from 'react';
import profileImage from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';

const AvatarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Đóng dropdown khi nhấn ngoài
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleClickLogOut = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    // Thêm sự kiện click bên ngoài để đóng menu
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left z-10" ref={dropdownRef}>
            {/* Avatar */}
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center w-full rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
                >
                    <img
                        src={profileImage}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute -left-2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        <button
                            onClick={() => alert('Xem hồ sơ')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            View profile
                        </button>
                        <button
                            onClick={() => alert('Cài đặt tài khoản')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Account settings
                        </button>
                        <button
                            onClick={handleClickLogOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarDropdown;
