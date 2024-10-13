import React from 'react';
import { convertVnd } from '../tool/toolAll';

const ItemCartProduct = ({ name, price, imageUrl, color, size, viewItem }) => {
    return (
        <div>
            <div className="flex">
                <img className="w-2/6 h-32 object-scale-down" src={imageUrl} alt="Product Image" onClick={viewItem} />
                <div className='w-4/6 p-6'>
                    <div className='text-xl'>{name}</div>
                    <div className='text-gray-500'>{convertVnd(price)}</div>
                    <div className='text-gray-500'>
                        <span>{color} / {size}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCartProduct;