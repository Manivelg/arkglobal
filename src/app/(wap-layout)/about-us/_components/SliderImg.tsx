"use client";
import React from "react";
import { SliderLists } from "../_actions/sliderImg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function SliderImg() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
  return (
    <section className="aboutServices">
      <div className="w-full py-6 bg-white">
        <Swiper
          spaceBetween={20}
          slidesPerView={3.5}
          centeredSlides={true}
          loop={true}
          freeMode={true}
          resistanceRatio={0.5}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={3000}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1.3,
            },
            500: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1440: {
              slidesPerView: 3.5,
            },
          }}
        >
          {SliderLists[0].data.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="">
                <Image
                  src={src.Image}
                  alt={companyUrl}
                  width={600}
                  height={200}
                  loading="lazy"
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SliderImg;
