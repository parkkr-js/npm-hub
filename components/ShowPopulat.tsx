import React from 'react';
import { CarouselDemo } from './CarouselPopular';

interface ShowPopularProps {
  className?: string; // className prop 타입 정의
}
function ShowPopular({ className }: ShowPopularProps) {
  return (
    <div className={className}>
      <div className=" w-[1109px] flex p-[10px] flex-col items-start justify-center gap-[10px]">
        <p className="text-[38px] font-made-tommy text-secondary-10 font-normal leading-[normal]">
          Most popular packages
        </p>
        <p className="text-[20px] font-pretendard text-secondary-10 font-medium leading-[normal]">
          Some of the most downloaded packages over the past 60 days
        </p>
      </div>
      <CarouselDemo />
    </div>
  );
}
export default ShowPopular;
