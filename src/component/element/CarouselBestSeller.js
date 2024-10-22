import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ItemProduct from "./ItemProduct";
import { searchItems } from "../../services/serviceProduct";
import { useNavigate } from "react-router-dom";

const CarouselBestSeller = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const [divideBy, setDivideBy] = useState(4); // Mặc định là chia cho 4
    const swipeAreaRef = useRef(null);
    let startX = 0;
    let endX = 0;

    const fetchModules = async () => {
        try {
            const data = await searchItems(navigate, "", -1, 0, 9999999999, 0, 10);
            if (data && data.code === 1000 && data.result && data.result.content) {
                setModules(data.result.content);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia('(min-width: 1280px)').matches) {
                // Tailwind xl: min-width 1280px
                setDivideBy(4); // Nếu màn hình là md, chia cho 2
            } else if (window.matchMedia('(min-width: 1024px)').matches) {
                // Tailwind lg: min-width 1024px
                setDivideBy(3); // Nếu màn hình là md, chia cho 2
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                // Tailwind md: min-width 768px
                setDivideBy(2); // Nếu màn hình là md, chia cho 2
            } else if (window.matchMedia('(min-width: 640px)').matches) {
                // Tailwind sm: min-width 640px
                setDivideBy(2); // Nếu màn hình là sm, chia cho 1
            } else {
                setDivideBy(2); // Mặc định chia cho 1 nếu không phải sm hay md
            }
        };
        // Gọi hàm khi load trang
        handleResize();
        fetchModules();
        // Lắng nghe sự thay đổi kích thước màn hình
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Chuyển slide tự động sau 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === Math.ceil(modules.length / divideBy) - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 2 giây

        return () => clearInterval(interval);
    }, [activeIndex, Math.ceil(modules.length / divideBy)]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? Math.ceil(modules.length / divideBy) - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === Math.ceil(modules.length / divideBy) - 1 ? 0 : prevIndex + 1
        );
    };

    const handleTouchStart = (event) => {
        startX = event.touches[0].clientX; // Lưu vị trí bắt đầu
    };

    const handleTouchMove = (event) => {
        endX = event.touches[0].clientX; // Cập nhật vị trí khi di chuyển
    };

    const handleTouchEnd = () => {
        const distanceX = endX - startX; // Tính toán khoảng cách vuốt

        if (distanceX > 30) {
            console.log('Vuốt phải'); // Vuốt phải
            setActiveIndex((prevIndex) =>
                prevIndex === 0 ? Math.ceil(modules.length / divideBy) - 1 : prevIndex - 1
            );
        } else if (distanceX < -30) {
            console.log('Vuốt trái'); // Vuốt trái
            setActiveIndex((prevIndex) =>
                prevIndex === Math.ceil(modules.length / divideBy) - 1 ? 0 : prevIndex + 1
            );
        }
    };

    return (
        <div className="relative overflow-hidden w-full"
            ref={swipeAreaRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {modules &&
                    Array.from({ length: Math.ceil(modules.length / divideBy) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-400"
                                }`}
                        />
                    ))
                }
            </div>

            {/* Slideshow */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {modules &&
                    modules.map((item, index) => (
                        <div key={index} className="w-1/2 sm:w-1/2 lg:w-2/6 xl:w-1/4 flex-shrink-0 p-1 sm:p-2">
                            <ItemProduct name={item.name} description={item.description} price={item.price} imageUrl={item.imageUrl}
                                imageUrl2={item.imageUrl2} color={item.color} sizes={item.sizes} viewItem={() => {
                                    navigate("/product/" + item.id);
                                }}></ItemProduct>
                        </div>
                    ))
                }
            </div>

            {/* Controls */}
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 z-10"
                onClick={handlePrev}
            >
                <FaChevronLeft />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 z-10"
                onClick={handleNext}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default CarouselBestSeller;
