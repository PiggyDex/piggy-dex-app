"use client";

import { CurrencyAmount, Token } from "@piggy-dex/sdk-core";
import UniswapV2Pair from "@piggy-dex/v2-contracts/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { Pair } from "@piggy-dex/v2-sdk";
import { readContract } from "@wagmi/core";
import Big from "big.js";
import { useEffect, useMemo, useState } from "react";
import { useChainId } from "wagmi";

import { type TokenInterface } from "@/types";
import config from "@/wagmi.config";

const PairAbi = UniswapV2Pair.abi;

export const useFetchingPairData = (
  tokenA: TokenInterface,
  tokenB: TokenInterface,
): {
  pair: Pair;
  liquidity: string;
  isFetchingPairData: boolean;
  _tokenA: Token;
  _tokenB: Token;
} => {
  const [isFetchingPairData, setIsFetchingPairData] = useState<boolean>(true);

  const chainId = useChainId();
  const [pair, setPair] = useState<Pair>(
    new Pair(
      CurrencyAmount.fromRawAmount(
        new Token(chainId, tokenA.address, tokenA.decimals),
        "0",
      ),
      CurrencyAmount.fromRawAmount(
        new Token(chainId, tokenB.address, tokenB.decimals),
        "0",
      ),
    ),
  );
  const [liquidity, setLiquidity] = useState<string>("0");

  const _tokenA = useMemo(
    () => new Token(chainId, tokenA.address, tokenA.decimals),
    [tokenA, chainId],
  );

  const _tokenB = useMemo(
    () => new Token(chainId, tokenB.address, tokenB.decimals),
    [tokenB, chainId],
  );

  const pairAddress = useMemo(
    () => Pair.getAddress(_tokenA, _tokenB),
    [_tokenA, _tokenB],
  );

  useEffect(() => {
    const fetchPairData = async () => {
      try {
        const reserves = await readContract(config, {
          abi: PairAbi,
          address: pairAddress as `0x${string}`,
          functionName: "getReserves",
          chainId: chainId === 71 || chainId === 1030 ? chainId : undefined,
        });

        const liquidity = await readContract(config, {
          abi: PairAbi,
          address: pairAddress as `0x${string}`,
          functionName: "totalSupply",
          chainId: chainId === 71 || chainId === 1030 ? chainId : undefined,
        });
        return [
          Big((reserves as [Big, Big])[0].toString()).toFixed(),
          Big((reserves as [Big, Big])[1].toString()).toFixed(),
          Big((liquidity as Big).toString()).toFixed(),
        ];
      } catch (error) {
        return ["0", "0", "0"];
      }
    };
    fetchPairData().then((value) => {
      const [reserve0, reserve1, liquidity] = value;
      const pairCreated: Pair = new Pair(
        CurrencyAmount.fromRawAmount(_tokenA, reserve0),
        CurrencyAmount.fromRawAmount(_tokenB, reserve1),
      );
      setPair(pairCreated);
      setLiquidity(liquidity);
      setIsFetchingPairData(false);
    });
  }, [_tokenA, _tokenB, pairAddress, chainId]);

  return {
    pair,
    liquidity,
    isFetchingPairData,
    _tokenA,
    _tokenB,
  };
};
