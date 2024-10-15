import React from 'react';
import IntBox from './IntBox';

const PriceFilter = ({ enabled, minPrice, maxPrice, toggleFilter, onChangeMin, onChangeMax }) => {
    return (
        <>
            <div className='flex p-3'>
                <div className='w-1/2'>Giá</div>
                <div className='w-1/2 flex justify-end items-end'>
                    <div
                        className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                        onClick={toggleFilter}
                    >
                        {/* Circle */}
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-4' : ''}`}
                        ></div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    {/* Input fields */}
                    {enabled && (
                        <div className="p-3 flex">
                            <IntBox className='mr-1 mb-2' value={minPrice} labelName="Từ" onChange={onChangeMin}></IntBox>
                            <IntBox className='ml-1 mb-2' value={maxPrice} labelName="Đến" onChange={onChangeMax}></IntBox>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PriceFilter;
