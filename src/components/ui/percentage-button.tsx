"use client";
import { type FC } from "react";

type PercentageButtonProps = {
  percentageValue: number;
  isActive: boolean;
  onClick?: () => void;
};

export const PercentageButton: FC<PercentageButtonProps> = ({
  percentageValue,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`bg-white hover:border-[#E1A1B1] ${isActive ? "text-[#E1A1B1] border-[#E1A1B1]" : ""} hover:text-[#E1A1B1] border box-border px-2 rounded-lg`}
      onClick={onClick}
    >
      {percentageValue}%
    </button>
  );
};
