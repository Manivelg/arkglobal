"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import { OurTeam } from "../_actions/OurTeam";
import type { Mixer } from "mixitup";

// Extracted constants outside the component
const ServiceData = OurTeam[0].data;
const ServiceHead = OurTeam[0].data;
const uniqueServices = ServiceHead.filter(
  (value, index, self) =>
    index === self.findIndex((t) => t.ServiceName === value.ServiceName)
);

const Teammates = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLDivElement[]>([]);
  const mixerRef = useRef<Mixer | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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
      matchedService.ServiceId === "All"
        ? "all"
        : `.${matchedService.ServiceId}`;

    setActiveFilter(matchedService.ServiceId);
    mixerRef.current?.filter(filterClass);

    setTimeout(() => {
      document.querySelector(".all_active")?.dispatchEvent(new Event("click"));
    }, 100);

    document
      .getElementById("ourService")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const initMixitup = async () => {
      const mixitup = (await import("mixitup")).default;

      if (containerRef.current) {
        const mixer = mixitup(containerRef.current, {
          selectors: {
            target: ".mix",
          },
          animation: {
            duration: 300,
          },
          controls: {
            scope: "local",
          },
        });

        mixerRef.current = mixer;
      }
    };

    initMixitup();
  }, []);

  useEffect(() => {
    const activeIndex = ServiceHead.findIndex(
      (item) => item.ServiceId === activeFilter
    );
    const activeButton = buttonRefs.current[activeIndex];
    const wrapper = scrollWrapperRef.current;

    if (activeButton && wrapper) {
      wrapper.scrollTo({
        left:
          activeButton.offsetLeft -
          wrapper.offsetWidth / 2 +
          activeButton.offsetWidth / 2,
        behavior: "smooth",
      });
      setTimeout(() => checkScrollEnd(), 500);
    }

    const handleResize = () => {
      if (activeButton && wrapper) {
        wrapper.scrollTo({
          left:
            activeButton.offsetLeft -
            wrapper.offsetWidth / 2 +
            activeButton.offsetWidth / 2,
          behavior: "smooth",
        });
      }
      setTimeout(() => checkScrollEnd(), 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeFilter]);

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

  const checkScrollEnd = () => {
    if (!scrollWrapperRef.current) return;
    const wrapper = scrollWrapperRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = wrapper;

    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    setIsAtStart(scrollLeft <= 0);
  };

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    handleScroll();
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="mixitScore" id="our_team">
      <div className="container px-4 mx-auto">
        <div ref={containerRef}>
          <div className="relative">
            {!isAtStart && (
              <div className="pointer-events-none absolute left-0 top-0 h-[100px] sm:h-[50px] small:h-[50px] w-[5%] small:w-[20%] bg-gradient-to-r from-white to-transparent z-10 hide_shadow"></div>
            )}

            {!isAtEnd && (
              <div className="pointer-events-none absolute right-0 top-0 h-[100px] sm:h-[50px] small:h-[50px] w-[5%] small:w-[20%] bg-gradient-to-l from-white to-transparent z-10 hide_shadow"></div>
            )}

            <div
              className="flex overflow-x-auto whitespace-nowrap gap-5 min-h-[90px] no-scrollbar move_shadow relative TeamCenter"
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
                        const filterClass =
                          e.ServiceId === "All" ? "all" : `.${e.ServiceId}`;
                        mixerRef.current?.filter(filterClass);

                        const activeButton = buttonRefs.current[index];
                        const wrapper = scrollWrapperRef.current;

                        if (activeButton && wrapper) {
                          const wrapperWidth = wrapper.offsetWidth;
                          const buttonOffset = activeButton.offsetLeft;
                          const buttonWidth = activeButton.offsetWidth;
                          const totalScrollWidth = wrapper.scrollWidth;

                          const isNearEnd =
                            buttonOffset + buttonWidth * 2 >=
                            totalScrollWidth - wrapperWidth;

                          wrapper.scrollTo({
                            left: isNearEnd
                              ? totalScrollWidth - wrapperWidth
                              : buttonOffset -
                                wrapperWidth / 2 +
                                buttonWidth / 2,
                            behavior: "smooth",
                          });

                          setTimeout(() => {
                            handleScroll();
                          }, 500);
                        }
                      }}
                    >
                      {e.ServiceName}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="mix-container grid grid-cols-12 lg:gap-10 md:gap-10 sm:gap-7">
              {ServiceData.slice(1).map((e) => (
                <div
                  key={e.id}
                  className={`mix ${e.ServiceId} teamCard lg:col-span-4 md:col-span-6 col-span-12 sm:col-span-6 hover:shadow-lg`}
                >
                  <div className="teamPic">
                    <Image
                      src={e.Image}
                      className="teamImg"
                      width={250}
                      height={250}
                      alt={e.ServiceHeader}
                      title={e.ServiceHeader}
                    />
                  </div>
                  <div className="TeamHead">
                    <p
                      className="TeamHeader"
                      dangerouslySetInnerHTML={{ __html: e.ServiceHeader }}
                    ></p>
                    <p className="TeamPara">
                      {e.ServiceName}{" "}
                      {e.ServicePara !== "" ? `| ${e.ServicePara}` : ""}
                    </p>
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

export default Teammates;
