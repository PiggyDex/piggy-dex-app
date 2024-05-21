"use client";

import { useModal } from "@ebay/nice-modal-react";
import {
  CurrencyAmount,
  Percent,
  TradeType,
  V2_ROUTER_ADDRESSES,
} from "@piggy-dex/sdk-core";
import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import IUniswapRouter02 from "@piggy-dex/v2-contracts/out/IUniswapV2Router02.sol/IUniswapV2Router02.json";
import { Route, Trade } from "@piggy-dex/v2-sdk";
import { Alert, Button, type InputNumberProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FC, useEffect, useMemo, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

import {
  CustomConnectButton,
  PercentageButton,
  SelectTokenModal,
  SwapNowButton,
  type TokenListProps,
} from "@/components";
import {
  useCheckTokenApproval,
  useFetchingPairData,
  useGetTokenBalance,
} from "@/hooks";
import { convertUnitToValue, convertValueToUnit } from "@/lib";

import { TokenBox } from "./token-box";
import { TradeDetails } from "./trade-details";

const uniswapRouter02Abi = IUniswapRouter02.abi;
const erc20Abi = IERC20.abi;

type SwapBoxProps = {
  tokenA: TokenListProps;
  tokenB: TokenListProps;
};

export const SwapBox: FC<SwapBoxProps> = ({ tokenA, tokenB }) => {
  // const chainId = useChainId({
  //   config,
  // });
  const modal = useModal(SelectTokenModal);
  const router = useRouter();

  const percentageValues = [25, 50, 75];
  const [isActives, setIsActives] = useState<boolean[]>(
    new Array(percentageValues.length).fill(false),
  );
  const [tokenAmountA, setTokenAmountA] = useState<string>("1");
  const [tokenAmountB, setTokenAmountB] = useState<string>("1");

  // 0 is token A
  // 1 is token B
  const _setUsingTokenA = (newUsingTokenA: TokenListProps[]) => {
    if (newUsingTokenA[0] === tokenB) return;
    router.push(
      "/swap?tokenA=" + newUsingTokenA[0].address + "&tokenB=" + tokenB.address,
    );
  };

  const _setUsingTokenB = (newUsingTokenB: TokenListProps[]) => {
    if (newUsingTokenB[0] === tokenA) return;
    router.push(
      "/swap?tokenA=" + tokenA.address + "&tokenB=" + newUsingTokenB[0].address,
    );
  };

  const showModalA = () => {
    modal.show({
      usingTokens: [tokenA],
      setUsingTokens: _setUsingTokenA,
      title: "Select Token",
      maxSelect: 1,
      onlyShowAllTokens: false,
    });
  };

  const showModalB = () => {
    modal.show({
      usingTokens: [tokenB],
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

  const { writeContractAsync } = useWriteContract();

  const tokens = useMemo(() => [tokenA], [tokenA]);
  const tokensAmount = useMemo(() => [tokenAmountA], [tokenAmountA]);
  const [isLoadingApproval, allAproved] = useCheckTokenApproval(
    tokens,
    tokensAmount,
  );
  const { chainId, address } = useAccount();

  const approveToken = async () => {
    if (chainId && address) {
      await writeContractAsync({
        abi: erc20Abi,
        address: tokenA.address as `0x${string}`,
        functionName: "approve",
        args: [
          V2_ROUTER_ADDRESSES[chainId],
          convertValueToUnit(tokenAmountA, tokenA.decimals),
        ],
        account: address,
      });
    }
  };

  const handleSwap = async () => {
    // await a timeout
    if (chainId && address && !isFetchingPairData && liquidity !== "0") {
      const route = new Route([pair], _tokenA, _tokenB);
      const trade = new Trade(
        route,
        CurrencyAmount.fromRawAmount(
          _tokenA,
          convertValueToUnit(tokenAmountA, _tokenA.decimals),
        ),
        TradeType.EXACT_INPUT,
      );
      const amountOutMin = trade.minimumAmountOut(slippageTolerance).toExact(); // needs to be converted to e.g. decimal string
      const path = [tokenA.address, tokenB.address];
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
      await writeContractAsync({
        abi: uniswapRouter02Abi,
        address: V2_ROUTER_ADDRESSES[chainId] as `0x${string}`,
        functionName: "swapExactTokensForTokens",
        args: [
          convertValueToUnit(tokenAmountA, tokenA.decimals),
          convertValueToUnit(amountOutMin, tokenB.decimals),
          path,
          address,
          deadline,
        ],
      });
    }
  };

  // const tokenPair = useMemo(() => {
  //   return [usingTokenA[0], usingTokenB[0]];
  // }, [usingTokenA, usingTokenB]);

  // const [tokenPair, setTokenPair] = useState<TokenListProps[]>([
  //   tokenList[0],
  //   tokenList[1],
  // ]);

  const { pair, liquidity, isFetchingPairData, _tokenA, _tokenB } =
    useFetchingPairData(tokenA, tokenB);

  const tokenABalance = useGetTokenBalance(tokenA);
  const tokenBBalance = useGetTokenBalance(tokenB);

  const slippageTolerance = new Percent("50", "100");

  useEffect(() => {
    if (!isFetchingPairData && liquidity !== "0") {
      const output = pair.getOutputAmount(
        CurrencyAmount.fromRawAmount(
          _tokenA,
          convertValueToUnit(tokenAmountA, _tokenA.decimals),
        ),
        true,
      );
      setTokenAmountB(
        convertUnitToValue(output[0].quotient.toString(), tokenB.decimals),
      );
    }
  }, [
    pair,
    _tokenA,
    isFetchingPairData,
    liquidity,
    tokenAmountA,
    tokenB.decimals,
  ]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-50 px-16">
      <CustomConnectButton />
      <div className="flex h-fit w-full flex-col items-center justify-center gap-4 rounded-[10px] bg-white px-6 py-4">
        {/* header */}
        {!isFetchingPairData && liquidity === "0" && (
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
              tokens={[tokenA]}
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
              router.push(
                "/swap?tokenA=" + tokenB.address + "&tokenB=" + tokenA.address,
              );
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
              tokens={[tokenB]}
              tokensAmount={[tokenAmountB]}
              accountBalances={[tokenBBalance]}
              // handleInputChange={[handleTokenAmountChange]}
              showModal={[showModalB]}
            />
          </div>
        </div>
        <TradeDetails />
        <div className="h-px w-full bg-[#FBF1F3]"></div>
        <SwapNowButton handleSwap={handleSwap} />
        {!isLoadingApproval && allAproved.includes(false) && (
          <Button onClick={approveToken}>Approve</Button>
        )}
      </div>
    </div>
  );
};
