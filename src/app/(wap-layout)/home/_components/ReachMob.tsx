"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CountUp from "react-countup";
import { ReachLists } from "../_actions/reach";
import { useInView } from "react-intersection-observer";

type ReachItem = {
  id: string | number;
  ReachHeader: string;
  ReachPara: number;
  ReachSufix?: string;
  ReachDescription: string;
};

const ReachMobCard: React.FC<{ item: ReachItem }> = ({ item }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className="small: col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 bg-[#f9f9f9] rounded-[25px] shadow-lg p-6 reachMobile"
    >
      <div>
        <h3 className="text-xl font-medium mb-2 text-[#1b4f72] reachHeader">
          {item.ReachHeader}
        </h3>
        {inView && (
          <CountUp
            start={0}
            end={item.ReachPara}
            duration={5}
            separator=""
            className="reachCount text-[42px] md:text-[42px] xl:text-[42px] 2xl:text-[62px] leading-[1.5] text-[#1b4f72]"
            suffix={item.ReachSufix}
          />
        )}
        <p className="text-gray-600 reachPara">{item.ReachDescription}</p>
      </div>
    </div>
  );
};

const ReachMob: React.FC = () => {
  const reachData: ReachItem[] = ReachLists[0].data;

  return (
    <div className="mobReach">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="reach_card"
        breakpoints={{
          320: {
            slidesPerView: 1.1,
          },
          360: {
            slidesPerView: 1.3,
          },
          500: {
            slidesPerView: 1.5,
          },
          600: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2.5,
          },
        }}
      >
        {reachData.map((item) => (
          <SwiperSlide key={item.id}>
            <ReachMobCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReachMob;
