// src/components/InputBox.js

import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const AmountBox = () => {
    const [value, setValue] = useState(1); // Khởi tạo giá trị mặc định là 0
    const max = 999999;
    const min = 1;
    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue === '' || parseFloat(inputValue) > max || parseFloat(inputValue) < min) {
            setValue(min); // Nếu input là rỗng, trả về min, 
            return;
        }

        if (Number.isInteger(parseFloat(inputValue))) {
            setValue(parseInt(inputValue));
            return; // Nếu input là rỗng, trả về min, 
        }

        setValue(min);
    };

    const increaseValue = () => {
        if (value < max)
            setValue(prevValue => prevValue + 1);
    };

    const decreaseValue = () => {
        setValue(prevValue => (prevValue > 1 ? prevValue - 1 : 1)); // Đảm bảo không giảm xuống dưới 0
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-3xl">
            <span className='px-3'>
                <FaMinus onClick={decreaseValue} />
            </span>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                className="flex-grow w-20 p-2 border-none focus:outline-none text-center appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
