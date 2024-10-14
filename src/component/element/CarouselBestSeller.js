import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ItemProduct from "./ItemProduct";
import { searchItems } from "../../services/serviceProduct";
import { useNavigate } from "react-router-dom";

const CarouselBestSeller = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    const fetchModules = async () => {
        try {

            const data = await searchItems(navigate, "", -1, 0, 9999999999, 0, 10);
            console.log(data);
            if (data && data.code === 1000 && data.result && data.result.content) {
                setModules(data.result.content);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    // Chuyển slide tự động sau 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === Math.ceil(modules.length / 4) - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 2 giây

        return () => clearInterval(interval);
    }, [activeIndex, Math.ceil(modules.length / 4)]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? Math.ceil(modules.length / 4) - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === Math.ceil(modules.length / 4) - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative overflow-hidden w-full">
            {/* Indicators */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {modules &&
                    Array.from({ length: Math.ceil(modules.length / 4) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-400"
                                }`}
                        />
                    ))
                }
            </div> */}

            {/* Slideshow */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {modules &&
                    modules.map((item, index) => (
                        <div key={index} className="w-full sm:w-1/2 lg:w-2/6 xl:w-1/4 flex-shrink-0 p-5">
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
