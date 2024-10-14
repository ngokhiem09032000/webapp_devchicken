import React, { } from 'react';
import image from '../../assets/choose_size.png';

const ChooseSizePopup = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-md shadow-lg w-11/12 lg:w-3/4 max-h-[90vh] overflow-y-auto">
                <div className='flex'>
                    <div className='w-2/6'><button
                        type="button"
                        className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-white hover:text-blue-950 border border-blue-950"
                        onClick={onClose}
                    >
                        Thoát
                    </button></div>
                    <div className='w-2/6'><h2 className="text-2xl font-md mb-1 text-center">Hướng dẫn chọn size</h2></div>
                    <div className='w-2/6'></div>
                </div>
                <div className='flex justify-center items-center'><img src={image} className="w-8/12 h-fit object-contain rounded mt-6" /></div>
            </div>
        </div>
    );
};

export default ChooseSizePopup;
