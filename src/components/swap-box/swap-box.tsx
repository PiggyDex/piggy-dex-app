"use client";

import { useModal } from "@ebay/nice-modal-react";
import { type InputNumberProps } from "antd";
import Image from "next/image";
import { type FC, useEffect, useState } from "react";

import {
  CustomConnectButton,
  PercentageButton,
  RefeshCountSwapBox,
  SelectTokenModal,
  SwapNowButton,
  type TokenListProps,
  tokenList,
} from "@/components";

import { TokenBox } from "./token-box";
import { TradeDetails } from "./trade-details";

export const SwapBox: FC = () => {
  const modal = useModal(SelectTokenModal);

  const reloadAfter = 15; // in seconds
  const [currentCount, setCurrentCount] = useState<number>(1);

  // increase the current count every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCount((prev) => (prev < reloadAfter ? prev + 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const percentageValues = [25, 50, 75];
  const [isActives, setIsActives] = useState<boolean[]>(
    new Array(percentageValues.length).fill(false),
  );
  const [tokenAmountA, setTokenAmountA] = useState<string>("1");
  // 0 is token A
  // 1 is token B
  const [usingTokenA, setUsingTokenA] = useState<TokenListProps[]>([
    tokenList[0],
  ]);
  const [usingTokenB, setUsingTokenB] = useState<TokenListProps[]>([
    tokenList[1],
  ]);

  const showModalA = () => {
    modal.show({
      usingTokens: usingTokenA,
      setUsingTokens: setUsingTokenA,
      title: "Select Token",
      maxSelect: 1,
      onlyShowAllTokens: false,
    });
  };

  const showModalB = () => {
    modal.show({
      usingTokens: usingTokenB,
      setUsingTokens: setUsingTokenB,
      title: "Select Token",
      maxSelect: 1,
      onlyShowAllTokens: false,
    });
  };

  const toggleActiveState = (index: number) => {
    if (isActives[index]) {
      setIsActives((prev) => prev.map((_, i) => (i === index ? false : false)));
    } else {
      setIsActives((prev) => prev.map((_, i) => (i === index ? true : false)));
      setTokenAmountA(
        ((percentageValues[index] / 100) * parseInt(tokenAmountA)).toString(),
      );
    }
  };

  const handleTokenAmountChange: InputNumberProps["onChange"] = (value) => {
    setTokenAmountA(parseFloat(value as string).toString());
    setIsActives(new Array(percentageValues.length).fill(false));
  };

  const handleSwap = async () => {
    // await a timeout
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="flex h-screen w-full justify-center px-16">
      <CustomConnectButton
        className="absolute right-16 top-12 [&_*]:border-0"
        buttonClassName="text-base not-italic font-bold leading-[120%] px-6 py-3 rounded-xl hover:cursor-pointer"
      />
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[10px] bg-white px-6 py-4">
        {/* header */}
        <div className="flex items-center self-stretch">
          <div className="flex flex-[1_1_0%] items-center gap-[10px] text-[20px] font-[400] leading-[24px] tracking-[0.4px] text-black">
            Swap
          </div>
          <div className="flex items-center justify-end gap-2">
            <RefeshCountSwapBox currentCount={currentCount} />
            <Image src="/swap-settings.svg" alt="" width={24} height={24} />
          </div>
        </div>
        <div className="h-px w-full bg-[#FBF1F3]"></div>
        {/* body */}
        <div className="flex items-center justify-center gap-[35px] self-stretch">
          <div className="flex flex-[1_1_0%] flex-col items-start gap-4">
            <div className="flex items-center gap-6 self-stretch">
              <div className="flex items-center gap-2 self-stretch">
                <div className="font-400 leading-[19.2px] text-[16p] text-black">
                  You pay
                </div>
                {percentageValues.map((value, index) => {
                  return (
                    <PercentageButton
                      key={index}
                      percentageValue={value}
                      isActive={isActives[index]}
                      onClick={() => {
                        toggleActiveState(index);
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex w-auto flex-[1_0_0%] items-center justify-end gap-1">
                <Image
                  src="/swap-plus.svg"
                  alt=""
                  width={24}
                  height={24}
                  onClick={showModalA}
                  className="hover:cursor-pointer"
                />
                <div
                  className="text-[16px] font-[400] leading-[19.2px] text-[#BF697E] hover:cursor-pointer"
                  onClick={showModalA}
                >
                  Add Token
                </div>
              </div>
            </div>
            <TokenBox
              tokens={usingTokenA}
              tokensAmount={[tokenAmountA]}
              accountBalances={[100]}
              handleInputChange={[handleTokenAmountChange]}
              showModal={[showModalA]}
            />
          </div>
          <Image
            src="/swap-arrow.svg"
            alt=""
            width={32}
            height={32}
            className="items-center justify-center hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const temp = usingTokenB;
              setUsingTokenB(usingTokenA);
              setUsingTokenA(temp);
            }}
          />
          <div className="flex flex-[1_1_0%] flex-col items-start gap-4">
            <div className="flex items-center gap-6 self-stretch">
              <div className="flex items-center gap-2 self-stretch">
                <div className="font-400 leading-[19.2px] text-[16p] text-black">
                  You receive (Est.)
                </div>
              </div>
              <div className="flex flex-[1_0_0%] items-center justify-end gap-1">
                <Image
                  src="/swap-plus.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="hover:cursor-pointer"
                  onClick={showModalB}
                />
                <div
                  className="text-[16px] font-[400] leading-[19.2px] text-[#BF697E] hover:cursor-pointer"
                  onClick={showModalB}
                >
                  Add Token
                </div>
              </div>
            </div>
            <TokenBox
              tokens={usingTokenB}
              tokensAmount={[100]}
              accountBalances={[100]}
              handleInputChange={[handleTokenAmountChange]}
              showModal={[showModalB]}
            />
          </div>
        </div>
        <TradeDetails />
        <div className="h-px w-full bg-[#FBF1F3]"></div>
        <SwapNowButton handleSwap={handleSwap} />
      </div>
    </div>
  );
};
