"use client";

import { useModal } from "@ebay/nice-modal-react";
import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import { Alert, Button, type InputNumberProps } from "antd";
import type Big from "big.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

import {
  type PortfolioManagementProps,
  SelectTokenModal,
  Supply,
} from "@/components";
import { Page } from "@/constants";
import { useTokenList } from "@/hooks";
import { type TokenInterface } from "@/types";

import "./loader-text.css";

const erc20Abi = IERC20.abi;

type ChoosePairProps = {
  tokens: TokenInterface[];
  setTokens: (tokens: TokenInterface[]) => void;
};

export const ChoosePair: FC<ChoosePairProps> = ({ tokens, setTokens }) => {
  const modal = useModal(SelectTokenModal);
  const showModal = () => {
    modal.show({
      usingTokens: tokens,
      setUsingTokens: setTokens,
      title: "Select Token",
      maxSelect: 2,
      onlyShowAllTokens: false,
      showPageAfterSelect: Page.Supply,
    });
  };

  return (
    <div className="flex w-full flex-col gap-8 self-stretch rounded-[15px] bg-white px-6 py-8">
      <span className="text-[16px] leading-[19.2px] text-[#414141]">
        Choose a pair
      </span>
      <Button
        className="flex h-auto items-center justify-center gap-[10px] self-stretch rounded-[10px] bg-[#EFEFEF] px-6 py-3"
        type="primary"
        onClick={showModal}
      >
        <span className="text-[16px] font-[400] leading-[19.2px] text-[#414141]">
          Select 2 Tokens
        </span>
        <Image
          src="/add-liquidity-1.svg"
          alt="add-liquidity"
          width={24}
          height={24}
        />
      </Button>
    </div>
  );
};

export const AddLiquidty: FC<PortfolioManagementProps> = ({
  showPage,
  tokenA,
  tokenB,
}) => {
  const modal = useModal(SelectTokenModal);
  const router = useRouter();
  const { address, status } = useAccount();

  const { tokenList } = useTokenList();

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

  const [tokenAmountA, setTokenAmountA] = useState<string>("1");
  const [tokenAmountB, setTokenAmountB] = useState<string>("1");

  // 0 is token A
  // 1 is token B
  const [usingTokenA, setUsingTokenA] = useState<TokenInterface[]>([
    tokenA || tokenList[0],
  ]);
  const [usingTokenB, setUsingTokenB] = useState<TokenInterface[]>([
    tokenB || tokenList[1],
  ]);

  const _setUsingTokenA = (newUsingTokenA: TokenInterface[]) => {
    if (newUsingTokenA[0].address === usingTokenB[0].address) return;
    setUsingTokenA(newUsingTokenA);
    router.push(
      `/portfolio/add/supply?tokenA=${newUsingTokenA[0].address}&tokenB=${usingTokenB[0].address}`,
    );
  };

  const _setUsingTokenB = (newUsingTokenB: TokenInterface[]) => {
    if (newUsingTokenB[0].address === usingTokenA[0].address) return;
    setUsingTokenB(newUsingTokenB);
    router.push(
      `/portfolio/add/supply?tokenA=${usingTokenA[0].address}&tokenB=${newUsingTokenB[0].address}`,
    );
  };

  const [usingTokens, setUsingTokens] = useState<TokenInterface[]>([
    usingTokenA[0],
    usingTokenB[0],
  ]);

  const handleTokenAmountAChange: InputNumberProps["onChange"] = (value) => {
    setTokenAmountA(parseFloat(value as string).toString());
  };

  const handleTokenAmountBChange: InputNumberProps["onChange"] = (value) => {
    setTokenAmountB(parseFloat(value as string).toString());
  };

  const { data: tokenABalance, isLoading: isFetchingBalanceA } =
    useReadContract({
      abi: erc20Abi,
      address: usingTokenA[0].address as `0x${string}`,
      functionName: "balanceOf",
      args: [address],
    });

  const { data: tokenBBalance, isLoading: isFetchingBalanceB } =
    useReadContract({
      abi: erc20Abi,
      address: usingTokenB[0].address as `0x${string}`,
      functionName: "balanceOf",
      args: [address],
    });

  if (status === "connecting" || status === "reconnecting") {
    return <></>;
  }

  if (status === "disconnected") {
    return (
      <Alert
        message="Please connect your wallet first."
        description="Click on Connect Wallet Button in the top right of the screen to connect your wallet."
        type="error"
      />
    );
  }

  if (isFetchingBalanceA || isFetchingBalanceB) {
    return <></>;
  }

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
        {(showPage && Page.Supply) > 0 && tokenA && tokenB && (
          <>
            <Image
              src="/next-right.svg"
              alt="next-right"
              width={24}
              height={24}
            />
            <span className="text-[16px] font-[400] leading-[19.2px] text-[#955263] ">
              Supply
            </span>
          </>
        )}
      </div>
      <div className="flex items-center  gap-2">
        <Image
          src="/arrow-left.svg"
          alt="arrow-left"
          width={16}
          height={16}
          onClick={() => {
            router.push("/portfolio");
          }}
          className="hover:cursor-pointer"
        />
        <span className="text-base font-[700] leading-[19.2px] text-black">
          Management
        </span>
        {(showPage && Page.Supply) > 0 && tokenA && tokenB && (
          <>
            <Image
              src="/arrow-left.svg"
              alt="arrow-left"
              width={16}
              height={16}
              onClick={() => {
                router.push("/portfolio/add");
              }}
              className="hover:cursor-pointer"
            />
            <span className="text-base font-[700] leading-[19.2px] text-black">
              Add liquidity
            </span>
          </>
        )}
      </div>

      {(showPage & Page.ChoosePair) > 0 && (
        <ChoosePair tokens={usingTokens} setTokens={setUsingTokens} />
      )}
      {(showPage && Page.Supply) > 0 && tokenA && tokenB && (
        <Supply
          tokens={[usingTokenA[0], usingTokenB[0]]}
          tokensAmount={[tokenAmountA, tokenAmountB]}
          accountBalances={[
            (tokenABalance as Big).toString(),
            (tokenBBalance as Big).toString(),
          ]}
          handleInputChange={[
            handleTokenAmountAChange,
            handleTokenAmountBChange,
          ]}
          showModal={[showModalA, showModalB]}
        />
      )}
    </div>
  );
};
