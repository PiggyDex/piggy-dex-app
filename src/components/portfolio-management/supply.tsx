"use client";

import {
  CurrencyAmount,
  Token,
  V2_ROUTER_ADDRESSES,
} from "@piggy-dex/sdk-core";
import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import IUniswapRouter02 from "@piggy-dex/v2-contracts/out/IUniswapV2Router02.sol/IUniswapV2Router02.json";
import { Button } from "antd";
import Big from "big.js";
import Image from "next/image";
import { type FC } from "react";
import {
  useAccount,
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { TokenBox, type TokenBoxProps } from "@/components";
import {
  useCheckTokenApproval,
  useFetchingPairData,
  useWrappedCFX,
} from "@/hooks";
import {
  calculatePercent,
  cn,
  convertValueToUnit,
  formatPercentage,
  formatSplitDigit,
} from "@/lib";

import "./loader-text.css";

const erc20Abi = IERC20.abi;
const uniswapRouter02Abi = IUniswapRouter02.abi;

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

export const Supply: FC<TokenBoxProps> = ({
  tokens,
  tokensAmount,
  accountBalances,
  handleInputChange,
  showModal,
}) => {
  const { pair, liquidity } = useFetchingPairData(tokens[0], tokens[1]);

  const [isLoadingApproval, allAproved] = useCheckTokenApproval(
    tokens,
    tokensAmount,
  );

  const { writeContractAsync, isPending, data: hash } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const chainId = useChainId();

  const { WCFX } = useWrappedCFX(chainId);

  const { address } = useAccount();

  const tokenA: Token = new Token(
    chainId,
    tokens[0].symbol === "CFX" ? WCFX.address : tokens[0].address,
    tokens[0].decimals,
  );
  const tokenB: Token = new Token(
    chainId,
    tokens[1].symbol === "CFX" ? WCFX.address : tokens[1].address,
    tokens[1].decimals,
  );
  const currencyAmountA = CurrencyAmount.fromRawAmount(
    tokenA,
    Big(tokensAmount[0]).mul(Big(10).pow(tokenA.decimals)).toFixed(),
  );
  const currencyAmountB = CurrencyAmount.fromRawAmount(
    tokenB,
    Big(tokensAmount[1]).mul(Big(10).pow(tokenB.decimals)).toFixed(),
  );
  const liquidityMinted: Big =
    liquidity &&
    currencyAmountA.greaterThan("0") &&
    currencyAmountB.greaterThan("0")
      ? new Big(
          pair
            .getLiquidityMinted(
              CurrencyAmount.fromRawAmount(pair.liquidityToken, liquidity),
              currencyAmountA,
              currencyAmountB,
            )
            .quotient.toString(),
        )
      : Big(0);

  const slippageTolerance = 1;

  const handleSupply = async () => {
    const amount0 = convertValueToUnit(tokensAmount[0], tokens[0].decimals);
    const amount1 = convertValueToUnit(tokensAmount[1], tokens[1].decimals);

    if (tokens[0].symbol === "CFX") {
      await writeContractAsync({
        abi: uniswapRouter02Abi,
        address: V2_ROUTER_ADDRESSES[chainId] as `0x${string}`,
        functionName: "addLiquidityETH",
        args: [
          tokens[1].address,
          BigInt(amount1),
          (BigInt(amount1) * (BigInt(100) - BigInt(slippageTolerance * 100))) /
            BigInt(100),
          (BigInt(amount0) * (BigInt(100) - BigInt(slippageTolerance * 100))) /
            BigInt(100),
          address,
          Date.now() + 1000 * 60 * 1,
        ],
        value: BigInt(amount0),
      });
      return;
    }

    if (tokens[1].symbol === "CFX") {
      await writeContractAsync({
        abi: uniswapRouter02Abi,
        address: V2_ROUTER_ADDRESSES[chainId] as `0x${string}`,
        functionName: "addLiquidityETH",
        args: [
          tokens[0].address,
          BigInt(amount0),
          (BigInt(amount0) * (BigInt(100) - BigInt(slippageTolerance * 100))) /
            BigInt(100),
          (BigInt(amount1) * (BigInt(100) - BigInt(slippageTolerance * 100))) /
            BigInt(100),
          address,
          Date.now() + 1000 * 60 * 1,
        ],
        value: BigInt(amount1),
      });
      return;
    }

    await writeContractAsync({
      abi: uniswapRouter02Abi,
      address: V2_ROUTER_ADDRESSES[chainId] as `0x${string}`,
      functionName: "addLiquidity",
      args: [
        tokens[0].address,
        tokens[1].address,
        BigInt(amount0),
        BigInt(amount1),
        (BigInt(amount0) * (BigInt(100) - BigInt(slippageTolerance * 100))) /
          BigInt(100),
        (BigInt(amount1) * (BigInt(100) - BigInt(slippageTolerance * 100))) /
          BigInt(100),
        address,
        Date.now() + 1000 * 60 * 1,
      ],
    });
  };

  const checkAllApproved = (): boolean => {
    if (tokens[0].symbol !== "CFX" && allAproved[0] === false) return false;
    if (tokens[1].symbol !== "CFX" && allAproved[1] === false) return false;
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-8 self-stretch rounded-[15px] bg-white px-6 py-8">
      <div className="flex items-start justify-center gap-8 self-stretch">
        <div className="flex-0 flex w-full flex-col gap-8">
          <span className="w-full self-stretch text-[16px] font-[700] leading-[19.2px] text-[#414141]">
            Token pair
          </span>
          <TokenBox
            tokens={[tokens[0]]}
            tokensAmount={[tokensAmount[0].toString()]}
            accountBalances={[accountBalances[0]]}
            handleInputChange={
              handleInputChange && handleInputChange[0]
                ? [handleInputChange[0]]
                : undefined
            }
            showModal={[showModal[0]]}
          />
          <TokenBox
            tokens={[tokens[1]]}
            tokensAmount={[tokensAmount[1].toString()]}
            accountBalances={[accountBalances[1]]}
            handleInputChange={
              handleInputChange && handleInputChange[1]
                ? [handleInputChange[1]]
                : undefined
            }
            showModal={[showModal[1]]}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-8">
          <span className="w-full self-stretch text-[16px] font-[700] leading-[19.2px] text-[#414141]">
            Pool review
          </span>
          <div className="flex w-full flex-col items-start gap-[21px]">
            {!liquidity && (
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
            )}
            <div className="flex w-full flex-col items-start gap-3 self-stretch text-[16px] font-[400] leading-[19.2px] text-[#272727]">
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item
                name="Pool Share"
                value={`${liquidity && liquidityMinted.gt("0") ? formatPercentage(calculatePercent(liquidityMinted, liquidity)) : 0} %`}
              />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item
                name="Rate"
                value={`1 ${tokens[0].symbol} = ${liquidity !== "0" ? pair.token0Price.toFixed() : "undefined"} ${tokens[1].symbol}`}
              />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item
                name="Total Pool Supply"
                value={`${formatSplitDigit(liquidity ? liquidity : Big(0), 18)} (${tokens[0].symbol} - ${tokens[1].symbol}) LP`}
              />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item
                name="Slippage Tolerance"
                value={`${slippageTolerance * 100}%`}
              />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Created By" value="You" />
              <div className="h-px bg-[#FBF1F3]"></div>
              <Item name="Created At" value="2024/04/08" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-[#FBF1F3]"></div>
      {!isLoadingApproval && allAproved.includes(false) && (
        <div className="flex justify-end gap-8 self-stretch">
          {allAproved.map((value, index) => {
            if (value === true) return <></>;
            return (
              <Button
                type="primary"
                className={cn(
                  "flex h-auto items-end gap-2 self-end rounded-[10px] bg-[#EFEFEF] px-9 py-2 text-[16px] font-[700] text-[#414141]",
                  isPending ? "loader" : "",
                  tokens[index].symbol === "CFX" ? "hidden" : "",
                )}
                onClick={async () => {
                  await writeContractAsync(
                    {
                      abi: erc20Abi,
                      address: tokens[index].address as `0x${string}`,
                      functionName: "approve",
                      args: [
                        V2_ROUTER_ADDRESSES[chainId],
                        convertValueToUnit(
                          tokensAmount[index],
                          tokens[index].decimals,
                        ),
                      ],
                      account: address,
                    },
                    {
                      onSuccess: () => {
                        allAproved[index] = true;
                      },
                    },
                  );
                }}
                key={tokens[index].address}
                disabled={allAproved[index]}
              >
                {!isPending
                  ? !isConfirming
                    ? `Approve ${tokens[index].symbol}`
                    : "Confirming"
                  : "Wait for sending tx"}
              </Button>
            );
          })}
        </div>
      )}
      {checkAllApproved() && (
        <Button
          type="primary"
          className="flex	h-auto items-end	gap-2 self-end rounded-[10px] bg-[#EFEFEF] px-9 py-2 text-[16px] font-[700] text-[#414141]"
          onClick={handleSupply}
        >
          Supply
          <Image
            src="/add-liquidity-1.svg"
            alt="add-liquidity"
            width={24}
            height={24}
            className="text-black"
          />
        </Button>
      )}
      <div />
    </div>
  );
};
