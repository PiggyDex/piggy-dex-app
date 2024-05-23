import { CurrencyAmount, Token } from "@piggy-dex/sdk-core";
import UniswapV2Pair from "@piggy-dex/v2-contracts/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { Pair } from "@piggy-dex/v2-sdk";
import { readContract } from "@wagmi/core";
import type Big from "big.js";
import { useEffect, useMemo, useState } from "react";
import { useChainId } from "wagmi";

import { type TokenInterface } from "@/types";
import config from "@/wagmi.config";

const PairAbi = UniswapV2Pair.abi;

export const useFetchingPair = (
  tokenA: TokenInterface,
  tokenB: TokenInterface,
): [
  Pair | undefined,
  CurrencyAmount<Token> | undefined,
  boolean,
  Token,
  Token,
] => {
  const chainId = useChainId();

  const _tokenA: Token = useMemo(
    () => new Token(chainId, tokenA.address, tokenA.decimals),
    [chainId, tokenA],
  );

  const _tokenB: Token = useMemo(
    () => new Token(chainId, tokenB.address, tokenB.decimals),
    [chainId, tokenB],
  );

  const [pair, setPair] = useState<Pair | undefined>(undefined);
  const [liquidity, setLiquidity] = useState<CurrencyAmount<Token> | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        });
        const liquidity = await readContract(config, {
          abi: PairAbi,
          address: pairAddress as `0x${string}`,
          functionName: "totalSupply",
        });
        return [
          (reserves as [Big, Big])[0].toString(),
          (reserves as [Big, Big])[1].toString(),
          (liquidity as Big).toString(),
        ];
      } catch (error) {
        return ["0", "0", "0"];
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      const [reserve0, reserve1, liquidity] = await fetchPairData();
      const pairCreated: Pair = new Pair(
        CurrencyAmount.fromRawAmount(_tokenA, reserve0),
        CurrencyAmount.fromRawAmount(_tokenB, reserve1),
      );
      setPair(pairCreated);
      const tokenLiquidity: Token = pairCreated.liquidityToken;
      setLiquidity(CurrencyAmount.fromRawAmount(tokenLiquidity, liquidity));
      setIsLoading(false);
    };

    fetchData();
  }, [pairAddress, _tokenA, _tokenB]);

  return [pair, liquidity, isLoading, _tokenA, _tokenB];
};
