import React, { useEffect, useRef, useState } from 'react';
import ItemProduct from '../element/ItemProduct';
import { useNavigate } from 'react-router-dom';
import { searchItems } from '../../services/serviceProduct';
import Paginate from '../element/Paginate';
import { CiFilter } from 'react-icons/ci';
import Toggle from '../element/Toggle';
import PriceFilter from '../element/PriceFilter';
import TextBox from '../element/TextBox';
import { min } from 'date-fns';

const ProductPage = () => {

    const [modules, setModules] = useState([]);
    const navigate = useNavigate();


    // phần paginate
    const [keySearch, setKeySearch] = useState("");
    const [selectedPage, setSelectedPage] = useState(0);
    const itemsPerPage = 8; // Hiển thị 3 người trên mỗi trang
    // const totalPages = Math.ceil(modules.length / itemsPerPage);
    let totalPages = useRef(0);

    // Hàm xử lý khi thay đổi trang
    const handlePageChange = ({ selected }) => {
        if (enabledPrice)
            fetchModules(keySearch, enabled, minPrice, maxPrice, selected);
        else
            fetchModules(keySearch, enabled, 0, 9999999999, selected);
    };
    // phần paginate

    // toggle sẵn hàng
    const [enabled, setEnabled] = useState(false);

    const toggleSwitch = () => {
        if (enabledPrice)
            fetchModules(keySearch, !enabled, minPrice, maxPrice, 0);
        else
            fetchModules(keySearch, !enabled, 0, 9999999999, 0);

        setEnabled(!enabled);
    };
    // toggle sẵn hàng

    // filter giá
    const [enabledPrice, setEnabledPrice] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(9999999999);

    const toggleFilter = () => {
        if (!enabledPrice)
            fetchModules(keySearch, enabled, minPrice, maxPrice, 0);
        else
            fetchModules(keySearch, enabled, 0, 9999999999, 0);
        setEnabledPrice(!enabledPrice);
    };
    // filter giá

    const fetchModules = async (key, stock, minP, maxP, page) => {
        try {
            debugger;
            const data = await searchItems(navigate, key, stock ? 0 : -1, minP, maxP, page, itemsPerPage);
            console.log(data);
            if (data && data.code === 1000 && data.result && data.result.content) {
                totalPages.current = data.result.totalPages;
                setModules(data.result.content);
            }
            setSelectedPage(page);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        fetchModules(keySearch, enabled, minPrice, maxPrice, 0);
    }, []);

    return (
        <div className="flex">
            <div className="w-1/12"></div>
            <div className="w-9/12 bg-white p-4">
                <div className='grid grid-cols-4 gap-4'>
                    {modules && modules.map((item, index) => (
                        <div onClick={() => {
                            navigate("/product/" + item.id);
                        }}>
                            <ItemProduct key={index} name={item.name} description={item.description} price={item.price} imageUrl={item.imageUrl} stock={item.stock}></ItemProduct>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-cente my-3">
                    <Paginate onPageChange={handlePageChange} pageCount={totalPages.current} forcePage={selectedPage}></Paginate>
                </div>
            </div>
            <div className="w-2/12 bg-white p-4">
                <div className='flex p-3'>
                    <CiFilter size={25} />Bộ lọc
                </div>
                <hr></hr>
                <div className='flex p-3'>
                    <div className='w-full'>
                        <TextBox value={keySearch || ''} labelName="Tìm kiếm" onChange={(e) => {
                            if (enabledPrice)
                                fetchModules(e.target.value, enabled, minPrice, maxPrice, 0);
                            else
                                fetchModules(e.target.value, enabled, 0, 9999999999, 0);

                            setKeySearch(e.target.value);
                        }}></TextBox>
                    </div>
                </div>
                <hr></hr>
                <div className='flex p-3'>
                    <div className='w-1/2'>
                        Sẵn hàng
                    </div>
                    <div className='w-1/2 flex justify-end items-end'>
                        <Toggle enabled={enabled} toggleSwitch={toggleSwitch}></Toggle>
                    </div>
                </div>
                <hr></hr>
                <PriceFilter enabled={enabledPrice} minPrice={minPrice} maxPrice={maxPrice} toggleFilter={toggleFilter}
                    onChangeMin={(e) => {
                        fetchModules(keySearch, enabled, e.target.value, maxPrice, 0);
                        setMinPrice(e.target.value)
                    }} onChangeMax={(e) => {
                        fetchModules(keySearch, enabled, minPrice, e.target.value, 0);
                        setMaxPrice(e.target.value)
                    }}>
                </PriceFilter>
                <hr></hr>
            </div>
        </div>
    );
};

export default ProductPage;