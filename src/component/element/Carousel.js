import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1 from "../../assets/11.jpg";
import image2 from "../../assets/12.jpg";
import image3 from "../../assets/13.jpg";

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        { src: image1, alt: "Los Angeles" },
        { src: image2, alt: "Chicago" },
        { src: image3, alt: "New York" }
    ];

    // Chuyển slide tự động sau 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 2 giây

        return () => clearInterval(interval);
    }, [activeIndex, slides.length]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative overflow-hidden w-full">
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>

            {/* Slideshow */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0"
                    >
                        <img src={slide.src} alt={slide.alt} className="w-full object-cover" />
                    </div>
                ))}
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

export default Carousel;
