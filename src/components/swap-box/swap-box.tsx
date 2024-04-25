"use client";

import { type InputNumberProps } from "antd";
import Image from "next/image";
import { type FC, useEffect, useState } from "react";

import {
  AddTokenButton,
  PercentageButton,
  RefeshCountSwapBox,
} from "@/components";

import { TokenBox } from "./token-box";

export const SwapBox: FC = () => {
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
  const [swapping, setSwapping] = useState<boolean>(false);
  const [tokenSymbolA, setTokenSymbolA] = useState<string>("BTC");
  const [tokenSymbolB, setTokenSymbolB] = useState<string>("WBTC");
  const [tokenAmountA, setTokenAmountA] = useState<number>(1);

  const toggleActiveState = (index: number) => {
    if (isActives[index]) {
      setIsActives((prev) => prev.map((_, i) => (i === index ? false : false)));
    } else {
      setIsActives((prev) => prev.map((_, i) => (i === index ? true : false)));
      setTokenAmountA((percentageValues[index] / 100) * 5);
    }
  };

  const handleTokenAmountChange: InputNumberProps["onChange"] = (value) => {
    setTokenAmountA(value as number);
  };

  const handleSwap = async () => {
    // await a timeout
    setSwapping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSwapping(false);
  };

  return (
    <div className="px-16 container">
      <div className="p-6 bg-white w-full rounded-lg shadow-md text-black space-y-4 divide-y-1 divide-pink-400/25 divide-solid">
        <div className="flex space-x-8 justify-between">
          <div className="text-xl font-normal">Swap</div>
          <div className="flex space-x-4">
            <RefeshCountSwapBox currentCount={currentCount} />
            <Image
              src="/swap-settings.svg"
              alt="swap-settings"
              width={24}
              height={24}
            />
          </div>
        </div>
        <hr />
        <div className="flex space-x-9">
          <div className="flex-col w-1/2 space-y-4">
            <div className="flex space-x-2 justify-between w-full">
              <div className="flex space-x-2 justify-between">
                <div className="flex">You pay</div>
                {percentageValues.map((value, index) => (
                  <PercentageButton
                    key={index}
                    percentageValue={value}
                    isActive={isActives[index]}
                    onClick={() => toggleActiveState(index)}
                  />
                ))}
              </div>
              <div className="flex">
                <AddTokenButton />
                <span className="text-[#BF697E]">Add Token</span>
              </div>
            </div>
            <TokenBox
              tokenSymbol={tokenSymbolA}
              tokenAmount={tokenAmountA}
              accountBalance={5}
              handleInputChange={handleTokenAmountChange}
            />
          </div>
          <button
            className="flex m-12"
            onClick={() => {
              // swap token symbols
              const temp = tokenSymbolA;
              setTokenSymbolA(tokenSymbolB);
              setTokenSymbolB(temp);
            }}
          >
            <Image
              src="/swap-arrow.svg"
              alt="swap-arrow"
              width={32}
              height={32}
            />
          </button>
          <div className="flex-col w-1/2 space-y-4">
            <div className="flex space-x-2 justify-between w-full">
              You receive (Est.)
            </div>
            <TokenBox
              tokenSymbol={tokenSymbolB}
              tokenAmount={5}
              accountBalance={0}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-1">
          <div className="text-[#BF697E]">Trade Details</div>
          <Image src="/swap-drop.svg" alt="swap-drop" width={16} height={16} />
        </div>
        <hr />
        <div className="flex justify-center items-center">
          <button
            className={`inline-flex border rounded-lg text-[#F1D4DB] font-bold border-[#BF697E] px-12 py-3 space-x-2 ${swapping ? "bg-[#BF697E]" : "bg-[#FBF1F3]"}  hover:bg-[#BF697E]`}
            onClick={() => handleSwap()}
          >
            <span>Swap now</span>
            <div className={swapping ? "animate-spin" : ""}>
              <Image
                src="/swap-now.svg"
                alt="swap-now"
                width={24}
                height={24}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
