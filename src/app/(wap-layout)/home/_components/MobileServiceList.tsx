import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { ServiceLists } from "../_actions/services";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

function MobileServiceList() {
  const ServiceData = ServiceLists[0].data;
  const router = useRouter();

  const showServices = () => {
    router.push(`/our-services#ourService`);
  };

  return (
    <>
      <div className="w-full mx-auto serviceMobile">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          //   autoplay={{ delay: 3000 }}
          autoplay={false}
          loop={true}
        >
          {ServiceData.map((e) => (
            <SwiperSlide key={e.id}>
              <div className="serviceList">
                <div className="">
                  <Image
                    src={e.Img}
                    className="serviceImg"
                    width={500}
                    height={500}
                    alt={e.ServiceHeader}
                    title={e.ServiceHeader}
                  />
                </div>
                <div className="serviceHead">
                  <p className="serviceHeader">{e.ServiceHeader}</p>
                  <p className="serviceYear">
                    {e.ServiceYear ? `(${e.ServiceYear})` : ``}
                  </p>
                  <p className="servicePara">{e.ServicePara}</p>
                </div>
                <div className="service_more">
                  <Button
                    label="View More"
                    className="submit_button"
                    onClick={() => showServices()}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default MobileServiceList;
