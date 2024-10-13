import React from 'react';
import Carousel from '../element/Carousel';
import CarouselBestSeller from '../element/CarouselBestSeller';

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <div className='py-3'>
        <div className='px-5 text-3xl font-bold mb-5'>Sản Phẩm Bán Chạy</div>
        <CarouselBestSeller></CarouselBestSeller>
      </div>
    </div>
  );
};

export default Home;