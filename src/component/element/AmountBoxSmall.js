import React from 'react';

const AmountBoxSmall = ({ value, min, max, handleChange, increaseValue, decreaseValue, error }) => {

    return (
        <div>
            <div className='cursor-pointer text-xl' onClick={increaseValue}>+</div>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                className={`w-20 p-2 focus:outline-none text-center appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                ${error ? "text-red-500" : "text-black"} border rounded-3xl ${error ? "border-red-500" : "border-gray-300"}`}
                min={min}
                max={max}
            />
            <div className='cursor-pointer text-xl' onClick={decreaseValue}>-</div>
        </div>

    );
};

export default AmountBoxSmall;