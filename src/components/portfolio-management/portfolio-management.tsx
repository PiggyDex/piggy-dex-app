"use client";

// import { Button } from "antd";
// import { useAtom } from "jotai";
// import Image from "next/image";
import { type FC } from "react";

// import { portfolioPoolStateAtom } from "@/atoms";
import {
  AddLiquidty,
  CustomConnectButton,
  Empty,
  Management,
} from "@/components";
import { Page } from "@/constants";
import { type TokenInterface } from "@/types";

// const PoolStateMap = {
//   ["0"]: <Empty />,
//   [">0"]: <AddLiquidty />,
// };

export type PortfolioManagementProps = {
  showPage: number;
  tokenA?: TokenInterface;
  tokenB?: TokenInterface;
};

export const PortfolioManagement: FC<PortfolioManagementProps> = ({
  showPage,
  tokenA,
  tokenB,
}) => {
  // const [{ pools }] = useAtom(portfolioPoolStateAtom);

  return (
    <div className="flex h-screen w-full flex-col gap-6 bg-neutral-50 px-8">
      <div className="flex w-full flex-row items-center justify-between self-stretch py-6">
        <span className="text-[24px] font-bold leading-[28.8px] text-black">
          Portfolio Management
        </span>
        <CustomConnectButton className="relative right-0 top-0" />
      </div>
      {(showPage & Page.Management) > 0 && <Management />}
      {(showPage & Page.Empty) > 0 && <Empty />}
      {(showPage & Page.AddLiquidity) > 0 && tokenA && tokenB && (
        <AddLiquidty showPage={Page.Supply} tokenA={tokenA} tokenB={tokenB} />
      )}
      {(showPage & Page.AddLiquidity) > 0 && (!tokenA || !tokenB) && (
        <AddLiquidty showPage={Page.ChoosePair} />
      )}
      {/* {PoolStateMap[pools.length > 0 ? ">0" : "0"]} */}
    </div>
  );
};
