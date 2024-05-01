import Image from "next/image";
import { type FC } from "react";

export const AddLiquidty: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 self-stretch">
        <Image src="/home.svg" alt="home" width={24} height={24} />
        <Image src="/next-right.svg" alt="next-right" width={24} height={24} />
        <span className="text-[16px] font-[400] leading-[19.2px] text-[#414141] ">
          Liquidity Management
        </span>
        <Image src="/next-right.svg" alt="next-right" width={24} height={24} />
        <span className="text-[16px] font-[400] leading-[19.2px] text-[#955263] ">
          Add
        </span>
      </div>
      <div className="flex gap-2">
        <Image src="/arrow-left.svg" alt="arrow-left" width={14} height={11} />
        <span className="text-[16px] font-[700] leading-[19.2px] text-black">
          Add liquidity
        </span>
      </div>
      <div className="flex w-full flex-col gap-8 self-stretch rounded-[15px] bg-white px-6 py-8">
        <span className="text-[16px] leading-[19.2px] text-[#414141]">
          Choose a pair
        </span>
        <button className="flex items-center justify-center gap-[10px] self-stretch rounded-[10px] bg-[#EFEFEF] px-6 py-[10px]">
          <span className="text-[16px] font-[400] leading-[19.2px] text-[#414141]">
            Select 2 Tokens
          </span>
          <Image
            src="/add-liquidity-1.svg"
            alt="add-liquidity"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};
