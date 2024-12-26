import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import custom styles
import './swiper.css';
import ScheduleCard from '../chat/ScheduledCard';

const SwiperComponent = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Swiper
                slidesPerView={3} 
                centeredSlides={false} 
                spaceBetween={10} 
                className="mySwiper"
                style={{
                    width: '100%', 
                    height: '100%', 
                }}
            >
                {/* 슬라이드 아이템 */}
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ScheduleCard/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SwiperComponent;

// 슬라이드 내부 스타일링
const slideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px', // 슬라이드 높이
    background: '#007bff', // 배경색
    color: 'white', // 텍스트 색상
    fontSize: '20px',
    borderRadius: '10px', // 둥근 모서리
};
