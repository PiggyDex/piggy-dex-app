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
      className={`bg-white hover:border-[#E1A1B1] ${isActive ? "border-[#E1A1B1] text-[#E1A1B1]" : ""} box-border rounded-lg border px-2 hover:text-[#E1A1B1]`}
      onClick={onClick}
    >
      {percentageValue}%
    </button>
  );
};
