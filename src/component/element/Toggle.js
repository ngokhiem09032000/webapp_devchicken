import React from 'react';

const Toggle = ({ enabled, toggleSwitch }) => {

    return (
        <div className="flex items-center justify-center">
            <div
                className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={toggleSwitch}
            >
                {/* Circle */}
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-4' : ''}`}
                ></div>
            </div>
        </div>
    );
};

export default Toggle;
