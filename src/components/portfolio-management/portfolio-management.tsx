import { Button } from "antd";
import Image from "next/image";
// import Image from "next/image";
import { type FC } from "react";

import { Empty } from "./empty";

export const PortfolioManagement: FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full px-8">
      <div className="flex items-center self-stretch py-6 justify-between w-full">
        <span className="font-bold text-[24px] leading-[28.8px] text-black">
          Portfolio Management
        </span>
        <Button
          type="primary"
          className="w-auto h-auto py-[10px] rounded-[10px]
            px-6 flex items-center justify-center border-0 bg-[#EABFCA] text-[#58303A]"
        >
          <div className="flex gap-[10px] justify-center items-center">
            <span className="text-[16px] leading-[19.2px] font-normal">
              New Position
            </span>
            <Image
              src="/add-liquidity.svg"
              alt=""
              width={16}
              height={16}
              className="flex p-[1.33px] shrink-0"
            />
          </div>
        </Button>
      </div>
      <Empty />
    </div>
  );
};
