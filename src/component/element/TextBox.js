import React from 'react';

const TextBox = ({ value, onChange, labelName, className, disabled }) => {
    return (
        <div className={className}>
            <div className="w-full">
                <div>
                    <input onChange={onChange} value={value} disabled={disabled} placeholder={labelName}
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300 shadow-sm focus:shadow focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default TextBox;