"use client";
import React from "react";
import CountUp from "react-countup";
import { ReachLists } from "../_actions/reach";
import { useInView } from "react-intersection-observer";

// Define the type for each item
type ReachItem = {
  id: string | number;
  ReachHeader: string;
  ReachPara: number;
  ReachSufix?: string;
  ReachDescription: string;
};

type ReachCardProps = {
  item: ReachItem;
};

const ReachCard: React.FC<ReachCardProps> = ({ item }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 bg-[#f9f9f9] rounded-[25px] shadow-lg p-6 reachMobile"
    >
      <h3 className="text-xl font-medium mb-2 text-[#1b4f72]">
        {item.ReachHeader}
      </h3>
      {inView && (
        <CountUp
          start={0}
          end={item.ReachPara}
          duration={5}
          separator=""
          className="text-[32px] md:text-[42px] xl:text-[42px] 2xl:text-[62px] leading-[1.5] text-[#1b4f72]"
          suffix={item.ReachSufix}
        />
      )}
      <p className="text-gray-600">{item.ReachDescription}</p>
    </div>
  );
};

const ReachDesk: React.FC = () => {
  const reachData: ReachItem[] = ReachLists[0].data;

  return (
    <div className="grid grid-cols-12 reach_act">
      {reachData.map((item) => (
        <ReachCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ReachDesk;
