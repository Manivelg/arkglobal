"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { FeedbackLists } from "../_actions/feedback";

function ClientFeedbacks() {
  const FeedbaclData = FeedbackLists[0].data;

  return (
    <>
      <div className="clients_feedback">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[25%] bg-gradient-to-r from-white to-transparent z-10 hide_shadow"></div>

        {/* Right Shadow */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[25%] bg-gradient-to-l from-white to-transparent z-10 hide_shadow"></div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={60}
          slidesPerView={1.7}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
            },
            400: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            500: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
            767: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.4,
              spaceBetween: 30,
            },
            991: {
              slidesPerView: 1.4,
              spaceBetween: 30,
            },
          }}
        >
          {FeedbaclData.map((e) => (
            <SwiperSlide key={e.id}>
              <div className="grid grid-cols-12 gap-4 feedCard">
                <div className="lg:col-span-8 md:col-span-6 sm:col-span-7 small:col-span-12">
                  <div className="feedHead">
                    <p className="feedPara">
                      <span className="feedbackQuote">
                        <Image
                          src="/assets/feedback/apost.svg"
                          className="apost_img"
                          alt="Review"
                          width={50}
                          height={50}
                        />
                      </span>
                      {e.FeedbackDescription}
                    </p>
                    <div>
                      <p className="feedName">{e.FeedbackName}</p>
                      <p className="feedDesignation">{e.FeedbackDesignation}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 md:col-span-6 sm:col-span-5 small:col-span-12">
                  <div className="feedPic">
                    <Image
                      src={e.Image}
                      width={400}
                      height={400}
                      className="feedImage"
                      alt={e.FeedbackName}
                      priority
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default ClientFeedbacks;
