"use client";

// import { Button } from "antd";
// import { useAtom } from "jotai";
// import Image from "next/image";
import { type FC } from "react";

// import { portfolioPoolStateAtom } from "@/atoms";
import { CustomConnectButton, type TokenListProps } from "@/components";
// import { Page } from "@/constants/const-variables";

import { AddLiquidty } from "./add-liquidity";
import { Empty } from "./empty";

// const PoolStateMap = {
//   ["0"]: <Empty />,
//   [">0"]: <AddLiquidty />,
// };

export type PortfolioManagementProps = {
  showPage: number;
  tokenA?: TokenListProps;
  tokenB?: TokenListProps;
};

export const PortfolioManagement: FC<PortfolioManagementProps> = ({
  showPage,
  tokenA,
  tokenB,
}) => {
  // const [{ pools }] = useAtom(portfolioPoolStateAtom);

  return (
    <div className="flex w-full flex-col gap-6 px-8">
      <div className="flex w-full items-center justify-between self-stretch py-6">
        <span className="text-[24px] font-bold leading-[28.8px] text-black">
          Portfolio Management
        </span>
        <CustomConnectButton
          px={30}
          py={10}
          fontSize={16}
          fontWeight={700}
          lineHeight={19.2}
          borderRadius={10}
        />
      </div>
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
