// src/components/ProductDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../services/apiService';
import { convertVnd } from '../tool/toolAll';
import { RiGuideFill } from 'react-icons/ri';
import AmountBox from '../element/AmountBox';

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                debugger;
                const response = await fetch(`${API_BASE_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data.result); // Giả sử dữ liệu sản phẩm nằm trong trường result
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className='text-center p-5 font-bold text-xl'>Product not found</div>;
    }

    return (

        <div className="mx-5 mt-5 p-4 border rounded shadow-lg flex">
            <img src={product.imageUrl} alt={product.name} className="w-1/2 h-96 object-contain rounded mt-6" />
            <div className='w-1/2'>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="mt-6 text-lg font-semibold">
                    <span className='pr-2'>{convertVnd(product.price)}</span>
                </div>
                <div className="mt-6 text-black cursor-pointer flex hover:text-gray-400">
                    <RiGuideFill size={25} /><span>Hướng dẫn chọn size áo</span>
                </div>
                <div className='mt-6'>
                    <span className='border rounded-3xl p-3 text-black font-bold'>Kích cỡ: {product.size}</span>
                </div>
                <p className="mt-6 text-gray-700">{product.description}</p>
                <div className='mt-6'>
                    Số lượng
                </div>
                <div className='mt-3'>
                    <div className='inline-flex'>
                        <AmountBox></AmountBox>
                    </div>
                </div>
                <button
                    className="mt-6 px-4 py-2 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
                    disabled={product.stock <= 0}
                >
                    {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                </button>
            </div>
        </div>

        // <div className="max-w-lg mx-auto mt-5 p-4 border rounded shadow-lg">
        //     <h1 className="text-2xl font-bold">{product.name}</h1>
        //     <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded mt-4" />
        //     <p className="mt-4 text-gray-700">{product.description}</p>
        //     <p className="mt-4 text-lg font-semibold">{product.price.toLocaleString()} đ</p>
        //     <p className="mt-4">Stock: {product.stock > 0 ? product.stock : 'Out of stock'}</p>
        //     <button
        //         className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        //         disabled={product.stock <= 0}
        //     >
        //         {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        //     </button>
        // </div>
    );
};

export default ProductDetail;
