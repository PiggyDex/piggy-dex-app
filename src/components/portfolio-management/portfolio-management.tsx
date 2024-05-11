import { Button } from "antd";
import Image from "next/image";
// import Image from "next/image";
import { type FC } from "react";

import { AddLiquidty } from "./add-liquidity";
// import { Empty } from "./empty";

export const PortfolioManagement: FC = () => {
  return (
    <div className="flex w-full flex-col gap-6 px-8">
      <div className="flex w-full items-center justify-between self-stretch py-6">
        <span className="text-[24px] font-bold leading-[28.8px] text-black">
          Portfolio Management
        </span>
        <Button
          type="primary"
          className="flex h-auto w-auto items-center
            justify-center rounded-[10px] border-0 bg-[#EABFCA] px-6 py-[10px] text-[#58303A]"
        >
          <div className="flex items-center justify-center gap-[10px]">
            <span className="text-[16px] font-normal leading-[19.2px]">
              New Position
            </span>
            <Image
              src="/add-liquidity.svg"
              alt=""
              width={16}
              height={16}
              className="flex shrink-0 p-[1.33px]"
            />
          </div>
        </Button>
      </div>
      {/* <Empty /> */}
      <AddLiquidty />
    </div>
  );
};
