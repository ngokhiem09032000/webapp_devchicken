import React, { useState } from 'react';
import { convertVnd } from '../tool/toolAll';

const ItemProduct = ({ name, description, price, imageUrl, imageUrl2, viewItem, color, sizes }) => {

    const stock = sizes.reduce((total, size) => {
        return total + parseInt(size.stock, 10); // Chuyển stock thành number và cộng vào tổng
    }, 0);

    const [src, setSrc] = useState(imageUrl);

    const handleMouseEnter = () => {
        setSrc(imageUrl2); // Ảnh khi hover
    };

    const handleMouseLeave = () => {
        setSrc(imageUrl); // Ảnh ban đầu
    };

    return (
        <div>
            <div className="rounded-md border overflow-hidden shadow-lg transform transition duration-300 hover:scale-90 hover:shadow-xl relative">
                <img className="w-full h-48 object-scale-down" src={src} onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} alt="Product Image" onClick={viewItem} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{name}</div>
                    <p className="text-gray-800 mb-2">
                        {color}
                    </p>
                    <p className="hidden text-gray-500 text-base lg:block">
                        {description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <span className="text-red-500 font-md text-sm lg:text-lg mr-2">{convertVnd(price)}</span>
                            {/* <span class="line-through text-gray-500">$30</span> */}
                        </div>
                        {/* <button className="bg-blue-950 text-white font-bold py-2 px-4 hover:bg-white hover:text-blue-950 border border-blue-950 rounded-3xl">
                            Mua ngay
                        </button> */}
                    </div>
                </div>
                {stock === 0 && <div className='absolute top-3 left-3 border rounded-xl p-2 bg-black text-white text-sm'>Hết hàng</div>}

            </div>
        </div>
    );
};

export default ItemProduct;