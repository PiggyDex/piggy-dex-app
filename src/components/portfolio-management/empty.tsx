"use client";

import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FC } from "react";

export const Empty: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-8 self-stretch rounded-[15px] bg-white py-8 text-black">
      <Image src="/profit.svg" alt="profit" width={218} height={210} />
      <span className="text-[16px] font-normal leading-[19.2px]">
        You do not have any liquidity yet, create one now!
      </span>
      {/* <Image
        src="/connect-wallet.svg"
        alt="connect-wallet"
        width={219}
        height={100}
      /> */}
      <Button
        type="primary"
        className="flex h-auto w-auto items-center
          justify-center rounded-[10px] border-0 bg-[#EABFCA] px-6 py-[10px] text-[#58303A]"
        onClick={() => {
          router.push("/portfolio/add");
        }}
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
  );
};
