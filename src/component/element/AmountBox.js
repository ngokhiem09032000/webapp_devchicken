// src/components/InputBox.js

import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const AmountBox = ({ value, min, max, handleChange, increaseValue, decreaseValue, error }) => {

    return (
        <div className={`flex items-center border rounded-3xl ${error ? "border-red-500" : "border-gray-300"}`}>
            <span className='px-3'>
                <FaMinus onClick={decreaseValue} />
            </span>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                className={`flex-grow w-20 p-2 border-none focus:outline-none text-center appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                ${error ? "text-red-500" : "text-black"}`}
                min={min}
                max={max}
            />
            <span className='px-3'>
                <FaPlus onClick={increaseValue} />
            </span>
        </div>
    );
};

export default AmountBox;
