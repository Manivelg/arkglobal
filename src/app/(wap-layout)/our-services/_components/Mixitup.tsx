"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TotalService } from "../_actions/TotalService";
import parse from "html-react-parser";
import { Button } from "primereact/button";
import type mixitup from "mixitup";

const Mixitup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLDivElement[]>([]);
  const mixerRef = useRef<ReturnType<typeof mixitup> | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const ServiceData = TotalService[0].data;

  const uniqueServices = ServiceData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.ServiceName === value.ServiceName)
  );

  // Initialize MixItUp
  useEffect(() => {
    (async () => {
      const mixitupLib = (await import("mixitup")).default;
      if (containerRef.current) {
        mixerRef.current = mixitupLib(containerRef.current, {
          selectors: { target: ".mix" },
          animation: { duration: 300 },
          controls: { scope: "local" },
        });
      }
    })();
  }, []);

  // Handle hash URL filtering
  useEffect(() => {
    const href = window.location.href;
    const hash = href.split("#")[1];
    if (!hash) return;

    const [paramType, paramId] = hash.split("_");
    if (paramType !== "service") return;

    const matchedService = uniqueServices.find(
      (ele) => ele.id === Number(paramId)
    );
    if (!matchedService) return;

    const filterClass =
      matchedService.ServiceId === "All" ? "*" : `.${matchedService.ServiceId}`;

    setActiveFilter(matchedService.ServiceId);
    mixerRef.current?.filter(filterClass);

    setTimeout(() => {
      document.querySelector(".all_active")?.dispatchEvent(new Event("click"));
    }, 100);

    document
      .getElementById("ourService")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [uniqueServices]);

  // Scroll active filter into center on change or resize
  useEffect(() => {
    const activeIndex = uniqueServices.findIndex(
      (item) => item.ServiceId === activeFilter
    );
    const activeButton = buttonRefs.current[activeIndex];
    const wrapper = scrollWrapperRef.current;

    const scrollToCenter = () => {
      if (activeButton && wrapper) {
        wrapper.scrollTo({
          left:
            activeButton.offsetLeft -
            wrapper.offsetWidth / 2 +
            activeButton.offsetWidth / 2,
          behavior: "smooth",
        });
        setTimeout(checkScrollEnd, 500);
      }
    };

    scrollToCenter();
    window.addEventListener("resize", scrollToCenter);
    return () => window.removeEventListener("resize", scrollToCenter);
  }, [activeFilter, uniqueServices]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollWrapperRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollWrapperRef.current.offsetLeft);
    setScrollLeft(scrollWrapperRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollWrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapperRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollWrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleScroll = () => {
    if (!scrollWrapperRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollWrapperRef.current;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
  };

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    handleScroll(); // Initial check
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);

  const checkScrollEnd = () => {
    if (!scrollWrapperRef.current) return;
    const wrapper = scrollWrapperRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = wrapper;
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    setIsAtStart(scrollLeft <= 0);
  };

  return (
    <section className="mixitScore" id="mixitScore">
      <div className="container px-4 mx-auto">
        <div ref={containerRef}>
          <div className="relative">
            {!isAtStart && (
              <div className="pointer-events-none absolute left-0 top-0 h-[100px] sm:h-[50px] w-[5%] sm:w-[20%] bg-gradient-to-r from-white to-transparent z-10" />
            )}
            {!isAtEnd && (
              <div className="pointer-events-none absolute right-0 top-0 h-[100px] sm:h-[50px] w-[5%] sm:w-[20%] bg-gradient-to-l from-white to-transparent z-10" />
            )}

            <div
              className="flex overflow-x-auto whitespace-nowrap gap-5 min-h-[90px] no-scrollbar"
              ref={scrollWrapperRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {uniqueServices.map((e, index) => {
                const isActive = activeFilter === e.ServiceId;
                const isLast = index === uniqueServices.length - 1;

                return (
                  <div
                    key={e.id}
                    ref={(el) => {
                      if (el) buttonRefs.current[index] = el;
                    }}
                    className="service_menu"
                  >
                    <Button
                      className={`service_button ${
                        isActive ? "all_active" : "in_active"
                      } ${isLast ? "last_child_class" : ""}`}
                      data-filter={
                        e.ServiceId === "All" ? "*" : `.${e.ServiceId}`
                      }
                      onClick={() => {
                        setActiveFilter(e.ServiceId);
                        mixerRef.current?.filter(
                          e.ServiceId === "All" ? "*" : `.${e.ServiceId}`
                        );
                      }}
                    >
                      {e.ServiceName}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="mix-container grid grid-cols-12 lg:gap-10 md:gap-10 sm:gap-0">
              {ServiceData.slice(1).map((e) => (
                <div
                  key={e.id}
                  className={`mix ${e.ServiceId} serviceCard lg:col-span-4 md:col-span-6 col-span-12`}
                >
                  <Image
                    src={e.Image}
                    className="serviceImg"
                    width={100}
                    height={100}
                    layout="responsive"
                    alt={e.ServiceHeader}
                    title={e.ServiceHeader}
                  />
                  <div className="serviceHead">
                    <p className="serviceHeader">{e.ServiceHeader}</p>
                    <p className="serviceshort">{e.ServiceName}</p>
                    <div className="servicePara">{parse(e.ServicePara)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mixitup;
