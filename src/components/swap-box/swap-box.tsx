"use client";

import { useModal } from "@ebay/nice-modal-react";
import { CurrencyAmount } from "@piggy-dex/sdk-core";
import { Alert, type InputNumberProps } from "antd";
import Image from "next/image";
import { type FC, useState } from "react";

import {
  PercentageButton,
  SelectTokenModal,
  SwapNowButton,
  type TokenListProps,
  tokenList,
} from "@/components";
import { useFetchingPair, useGetTokenBalance } from "@/hooks";

import { TokenBox } from "./token-box";
import { TradeDetails } from "./trade-details";

export const SwapBox: FC = () => {
  // const chainId = useChainId({
  //   config,
  // });
  const modal = useModal(SelectTokenModal);

  const percentageValues = [25, 50, 75];
  const [isActives, setIsActives] = useState<boolean[]>(
    new Array(percentageValues.length).fill(false),
  );
  const [tokenAmountA, setTokenAmountA] = useState<string>("1");
  // const [tokenAmountB, setTokenAmountB] = useState<string>("1");
  // 0 is token A
  // 1 is token B
  const [usingTokenA, setUsingTokenA] = useState<TokenListProps[]>([
    tokenList[0],
  ]);
  const [usingTokenB, setUsingTokenB] = useState<TokenListProps[]>([
    tokenList[1],
  ]);

  const _setUsingTokenA = (newUsingTokenA: TokenListProps[]) => {
    if (newUsingTokenA[0] === usingTokenB[0]) return;
    setUsingTokenA(newUsingTokenA);
  };

  const _setUsingTokenB = (newUsingTokenB: TokenListProps[]) => {
    if (newUsingTokenB[0] === usingTokenA[0]) return;
    setUsingTokenB(newUsingTokenB);
  };

  const showModalA = () => {
    modal.show({
      usingTokens: usingTokenA,
      setUsingTokens: _setUsingTokenA,
      title: "Select Token",
      maxSelect: 1,
      onlyShowAllTokens: false,
    });
  };

  const showModalB = () => {
    modal.show({
      usingTokens: usingTokenB,
      setUsingTokens: _setUsingTokenB,
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
  };

  // const tokenPair = useMemo(() => {
  //   return [usingTokenA[0], usingTokenB[0]];
  // }, [usingTokenA, usingTokenB]);

  // const [tokenPair, setTokenPair] = useState<TokenListProps[]>([
  //   tokenList[0],
  //   tokenList[1],
  // ]);

  const [pair, totalSupply, isLoading, ,] = useFetchingPair(
    usingTokenA[0],
    usingTokenB[0],
  );

  const tokenABalance = useGetTokenBalance(usingTokenA[0]);
  const tokenBBalance = useGetTokenBalance(usingTokenB[0]);

  if (!isLoading && pair) {
    // console.log(totalSupply?.quotient.toString());
    // const output = pair.getOutputAmount(
    //   CurrencyAmount.fromRawAmount(
    //     _tokenA,
    //     convertValueToUnit(tokenAmountA, _tokenA.decimals),
    //   ),
    //   true,
    // );
    // setTokenAmountB(output[0].quotient.toString());
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-50 px-16">
      {/* <CustomConnectButton /> */}
      <div className="flex h-fit w-full flex-col items-center justify-center gap-4 rounded-[10px] bg-white px-6 py-4">
        {/* header */}
        {pair &&
          totalSupply !==
            CurrencyAmount.fromRawAmount(pair.liquidityToken, 0) && (
            <Alert
              message="This Pool do not have liquidity yet."
              description="Try to add liquidity instead."
              type="error"
            />
          )}
        <div className="flex items-center self-stretch">
          <div className="flex flex-[1_1_0%] items-center gap-[10px] text-[20px] font-[400] leading-[24px] tracking-[0.4px] text-black">
            Swap
          </div>
          <div className="flex items-center justify-end gap-2">
            {/* <RefeshCountSwapBox /> */}
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
              accountBalances={[tokenABalance]}
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
              tokensAmount={["1"]}
              accountBalances={[tokenBBalance]}
              // handleInputChange={[handleTokenAmountChange]}
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
