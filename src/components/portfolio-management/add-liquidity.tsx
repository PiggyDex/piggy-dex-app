import Image from "next/image";
import { type FC } from "react";

import { TokenBox } from "../swap-box/token-box";

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
      {/* <ChoosePair /> */}
      <Supply />
    </div>
  );
};

type ItemProps = {
  name: string;
  value: string;
};

const Item: FC<ItemProps> = ({ name, value }) => {
  return (
    <div className="flex w-full items-start self-stretch">
      <div className="flex w-full items-center gap-1">
        <span>{name}</span>
        <Image
          src="/small-warning.svg"
          alt="small-warning"
          width={16}
          height={16}
          className="shrink-0"
        />
      </div>
      <span className="mr-1 flex-none">{value}</span>
    </div>
  );
};

export const Supply: FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 self-stretch rounded-[15px] bg-white px-6 py-8">
      <div className="flex items-start justify-center gap-8 self-stretch">
        <div className="flex-0 flex w-full flex-col gap-8">
          <span className="w-full self-stretch text-[16px] font-[700] leading-[19.2px] text-[#414141]">
            Token pair
          </span>
          <TokenBox tokenSymbol="ABC" tokenAmount={0} accountBalance={0} />
          <TokenBox tokenSymbol="XYZ" tokenAmount={0} accountBalance={0} />
        </div>
        <div className="flex w-full flex-col items-start gap-8">
          <span className="w-full self-stretch text-[16px] font-[700] leading-[19.2px] text-[#414141]">
            Pool review
          </span>
          <div className="flex w-full flex-col items-start gap-[21px]">
            <div className="flex flex-col items-start gap-2 self-stretch rounded-[15px] border-DEFAULT border-solid border-[#E1A1B1] bg-[#FBF1F3] px-4	py-3">
              <div className="flex items-center gap-1 self-stretch">
                <Image
                  src="/warning.svg"
                  alt="warning"
                  width={24}
                  height={24}
                />
                <span className="w-full text-[16px] font-[400] leading-[19.2px] text-[#5C5C5C]">
                  You are the first liquidity provider
                </span>
              </div>
              <span className="w-full text-[12px] font-[400] leading-[14.4px] text-[#5C5C5C]">
                The ratio of tokens you add will set the price of this pair.
                Once you are happy with the rate, click Supply button to reiew
                the information.
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-3 self-stretch text-[16px] font-[400] leading-[19.2px] text-[#272727]">
              <Item name="APR" value="0.5%" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Pool Share" value="100%" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Rate" value="1 AOT = 0 MEGG" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Total Pool Supply" value="0 AOT - MEGG LP" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Slippage Tolerance" value="0.5%" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Created By" value="You" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Created At" value="2024/04/08" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChoosePair: FC = () => {
  return (
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
  );
};
