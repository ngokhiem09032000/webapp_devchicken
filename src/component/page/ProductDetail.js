// src/components/ProductDetail.js

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, cartTitle } from '../../services/apiService';
import { addOrUpdateCart, calculateAmount, convertVnd } from '../tool/toolAll';
import { RiGuideFill } from 'react-icons/ri';
import AmountBox from '../element/AmountBox';
import { GlobalContext } from '../element/GlobalContext';

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState();
    const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
    const [sizeChoose, setSizeChoose] = useState("");
    // AmountBox
    const [valueAmount, setValueAmount] = useState(1); // Khởi tạo giá trị mặc định là 0
    const max = 999999;
    const min = 1;
    // AmountBox

    const stock = product && product.sizes ? product.sizes.reduce((total, size) => {
        if (sizeChoose === size.id.name)
            return total + parseInt(size.stock, 10);
        else
            return total;
    }, 0) : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const response = await fetch(`${API_BASE_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data.result);
                setSizeChoose(data.result.sizes[0].id.name);
                // Giả sử dữ liệu sản phẩm nằm trong trường result
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className='text-center p-5 font-bold text-xl'>Product not found</div>;
    }

    // AmountBox
    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue === '' || parseFloat(inputValue) > max || parseFloat(inputValue) < min) {
            setValueAmount(min); // Nếu input là rỗng, trả về min, 
            return;
        }

        if (Number.isInteger(parseFloat(inputValue))) {
            setValueAmount(parseInt(inputValue));
            return; // Nếu input là rỗng, trả về min, 
        }

        setValueAmount(min);
    };

    const increaseValue = () => {
        if (valueAmount < max)
            setValueAmount(prevValue => prevValue + 1);
    };

    const decreaseValue = () => {
        setValueAmount(prevValue => (prevValue > 1 ? prevValue - 1 : 1)); // Đảm bảo không giảm xuống dưới 0
    };
    // AmountBox

    return (

        <div className="mx-5 mt-5 mb-5 p-4 border rounded shadow-lg flex">
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
                    <span>Kích cỡ: {sizeChoose}</span>
                </div>
                <div className='mt-6 flex'>
                    {product && product.sizes && product.sizes.map((item, index) => (
                        <div key={index} className={`relative overflow-hidden border rounded m-2 w-10 h-10 flex justify-center items-center cursor-pointer hover:border-gray-400 
                        ${sizeChoose === item.id.name ? "border-gray-400" : ""} ${item.stock > 0 ? "" : "bg-gray-300"}`} onClick={() => {
                                setSizeChoose(item.id.name);
                            }}>
                            {item.id.name}
                            {item.stock <= 0 && <div className="absolute w-[1px] h-96 bg-gray-400 top-0 right-0 transform rotate-45 origin-top-right"></div>}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-gray-700">{product.description}</p>
                <div className='mt-6'>
                    Số lượng
                </div>
                <div className='mt-3'>
                    <div className='inline-flex'>
                        <AmountBox value={valueAmount} min={min} max={max} handleChange={handleChange} increaseValue={increaseValue} decreaseValue={decreaseValue}></AmountBox>
                    </div>
                </div>
                <button
                    className="mt-6 px-4 py-2 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
                    disabled={stock <= 0} onClick={() => {
                        if (!sizeChoose) {
                            alert("Vui lòng chọn size.");
                            return;
                        }
                        const cartData = JSON.parse(localStorage.getItem(cartTitle));
                        if (cartData && cartData.length > 0) {
                            const newObject = { id: product.id, amount: valueAmount, size: sizeChoose, totalPrice: product.price * valueAmount };
                            const updatedList = addOrUpdateCart(cartData, newObject);
                            localStorage.setItem(cartTitle, JSON.stringify(updatedList));
                            let amount = calculateAmount(updatedList);
                            setGlobalVariable(amount);
                        } else {
                            const newObject = { id: product.id, amount: valueAmount, size: sizeChoose, totalPrice: product.price * valueAmount };
                            localStorage.setItem(cartTitle, JSON.stringify([newObject]));
                            setGlobalVariable(valueAmount);
                        }
                        alert("Thêm vào giỏ hàng thành công " + valueAmount + " sản phẩm");
                    }}
                >
                    {stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
