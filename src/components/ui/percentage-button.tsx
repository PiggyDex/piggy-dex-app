"use client";
import { Button } from "antd";
import clsx from "clsx";
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
    <Button
      className={clsx(
        "flex items-center justify-center rounded-[10px] border border-solid px-2 py-1 text-[16px] font-[400] leading-[19.2px] text-[#929292] ",
        {
          "text-[#E1A1B1] border-[#E1A1B1]": isActive,
          "text-[#929292]  border-[#CCC]": !isActive,
        },
      )}
      onClick={onClick}
    >
      {percentageValue}%
    </Button>
  );
};
