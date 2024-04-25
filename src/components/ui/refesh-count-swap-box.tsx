"use client";

import { type FC } from "react";

type RefeshCountSwapBoxProps = {
  currentCount: number;
};

export const RefeshCountSwapBox: FC<RefeshCountSwapBoxProps> = ({
  currentCount,
}) => {
  const circumference = 2 * Math.PI * 800;

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 288 288" className="transform -rotate-90 w-7 h-7">
        <circle
          cx="145"
          cy="145"
          r="120"
          stroke="currentColor"
          strokeWidth="30"
          fill="transparent"
          className="text-black-700"
        />
        <circle
          cx="145"
          cy="145"
          r="120"
          stroke="currentColor"
          strokeWidth="30"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (currentCount / 100) * circumference
          }
          className="text-pink-400"
          style={{ transition: "stroke-dashoffset 0.35s ease 0s" }}
        />
      </svg>
      <span className="absolute text-base">{`${currentCount}`}</span>
    </div>
  );
};
