"use client";

import { CurrencyAmount, Token } from "@piggy-dex/sdk-core";
import UniswapV2Pair from "@piggy-dex/v2-contracts/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { Pair } from "@piggy-dex/v2-sdk";
import { readContract } from "@wagmi/core";
import Big from "big.js";
import { useEffect, useMemo, useState } from "react";
import { useChainId } from "wagmi";

import { useTokenList, useWrappedCFX } from "@/hooks";
import { type TokenInterface } from "@/types";
import config from "@/wagmi.config";

const PairAbi = UniswapV2Pair.abi;

export const useFetchingPairData = (
  tokenA: TokenInterface,
  tokenB: TokenInterface,
): {
  pair: Pair | undefined;
  liquidity: string;
  isFetchingPairData: boolean;
  _tokenA: Token;
  _tokenB: Token;
} => {
  const [isFetchingPairData, setIsFetchingPairData] = useState<boolean>(true);

  const chainId = useChainId();

  const { WCFX } = useWrappedCFX(chainId);

  const [pair, setPair] = useState<Pair | undefined>(undefined);
  const [liquidity, setLiquidity] = useState<string>("0");

  const _tokenA = useMemo(
    () =>
      new Token(
        chainId,
        tokenA.symbol === "CFX" ? WCFX.address : tokenA.address,
        tokenA.decimals,
      ),
    [tokenA, chainId, WCFX.address],
  );

  const _tokenB = useMemo(
    () =>
      new Token(
        chainId,
        tokenB.symbol === "CFX" ? WCFX.address : tokenB.address,
        tokenB.decimals,
      ),
    [tokenB, chainId, WCFX.address],
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
      let pairCreated: Pair | undefined = undefined;
      if (_tokenA.address.toLowerCase() !== _tokenB.address.toLowerCase()) {
        pairCreated = new Pair(
          CurrencyAmount.fromRawAmount(_tokenA, reserve0),
          CurrencyAmount.fromRawAmount(_tokenB, reserve1),
        );
      }
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

export const useFetchingPoolTokensFromAddress = (
  poolAddress: string,
): {
  tokenA: TokenInterface;
  tokenB: TokenInterface;
} => {
  const [token0Address, setToken0Address] = useState<string>("");
  const [token1Address, setToken1Address] = useState<string>("");
  const chainId = useChainId();
  const { tokenList } = useTokenList(chainId);
  const [tokenA, setTokenA] = useState<TokenInterface>(tokenList[1]);
  const [tokenB, setTokenB] = useState<TokenInterface>(tokenList[2]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const token0Address = await readContract(config, {
          abi: PairAbi,
          address: poolAddress as `0x${string}`,
          functionName: "token0",
        });
        const token1Address = await readContract(config, {
          abi: PairAbi,
          address: poolAddress as `0x${string}`,
          functionName: "token1",
        });
        setToken0Address(token0Address as string);
        setToken1Address(token1Address as string);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchTokens();
  }, [poolAddress]);

  useEffect(() => {
    if (token0Address && token1Address) {
      const tokenA = tokenList.find((token) => token.address === token0Address);
      const tokenB = tokenList.find((token) => token.address === token1Address);
      if (!tokenA || !tokenB) return;
      setTokenA(tokenA);
      setTokenB(tokenB);
    }
  }, [token0Address, token1Address, tokenList]);

  return {
    tokenA,
    tokenB,
  };
};

export const useFetchingPoolTokensFromAddresses = (poolAddresses: string[]) => {
  const [token0Addresses, setToken0Addresses] = useState<
    (string | undefined)[]
  >(Array(poolAddresses.length).fill(undefined));
  const [token1Addresses, setToken1Addresses] = useState<
    (string | undefined)[]
  >(Array(poolAddresses.length).fill(undefined));
  const chainId = useChainId();
  const { tokenList } = useTokenList(chainId);
  const [tokensA, setTokensA] = useState<(TokenInterface | undefined)[]>(
    Array(poolAddresses.length).fill(undefined),
  );
  const [tokensB, setTokensB] = useState<(TokenInterface | undefined)[]>(
    Array(poolAddresses.length).fill(undefined),
  );

  useEffect(() => {
    const fetchTokens = async (poolAddress: string) => {
      try {
        const token0Address = await readContract(config, {
          abi: PairAbi,
          address: poolAddress as `0x${string}`,
          functionName: "token0",
        });
        const token1Address = await readContract(config, {
          abi: PairAbi,
          address: poolAddress as `0x${string}`,
          functionName: "token1",
        });
        return {
          token0Address: token0Address as string,
          token1Address: token1Address as string,
        };
      } catch (error) {
        return {
          token0Address: undefined,
          token1Address: undefined,
        };
        // console.log(error);
      }
    };

    const fetchTokensList = async () => {
      const tokens = await Promise.all(
        poolAddresses.map((address) => fetchTokens(address)),
      );
      setToken0Addresses(tokens.map((token) => token.token0Address));
      setToken1Addresses(tokens.map((token) => token.token1Address));
    };

    fetchTokensList();
  }, [poolAddresses]);

  useEffect(() => {
    const tokensA = token0Addresses.map(
      (token0Address) =>
        tokenList.find(
          (token) =>
            token.address.toLowerCase() === token0Address?.toLowerCase(),
        ) || undefined,
    );
    const tokensB = token1Addresses.map(
      (token1Address) =>
        tokenList.find(
          (token) =>
            token.address.toLowerCase() === token1Address?.toLowerCase(),
        ) || undefined,
    );
    setTokensA(tokensA);
    setTokensB(tokensB);
  }, [token0Addresses, token1Addresses, tokenList]);

  return {
    tokensA,
    tokensB,
  };
};

// export const useFetchingOwnPoolTokensFromAddresses = (
//   poolAddresses: string[],
// ) => {
//   const [token0Addresses, setToken0Addresses] = useState<
//     (string | undefined)[]
//   >(Array(poolAddresses.length).fill(undefined));
//   const [token1Addresses, setToken1Addresses] = useState<
//     (string | undefined)[]
//   >(Array(poolAddresses.length).fill(undefined));
//   const chainId = useChainId();
//   const { tokenList } = useTokenList(chainId);
//   const [tokensA, setTokensA] = useState<(TokenInterface | undefined)[]>(
//     Array(poolAddresses.length).fill(undefined),
//   );
//   const [tokensB, setTokensB] = useState<(TokenInterface | undefined)[]>(
//     Array(poolAddresses.length).fill(undefined),
//   );
//   const { address } = useAccount();

//   useEffect(() => {
//     const fetchTokens = async (poolAddress: string) => {
//       try {
//         const token0Address = await readContract(config, {
//           abi: PairAbi,
//           address: poolAddress as `0x${string}`,
//           functionName: "token0",
//         });
//         const token1Address = await readContract(config, {
//           abi: PairAbi,
//           address: poolAddress as `0x${string}`,
//           functionName: "token1",
//         });
//         const balanceOf = await readContract(config, {
//           abi: PairAbi,
//           address: poolAddress as `0x${string}`,
//           functionName: "balanceOf",
//           args: [address],
//         });
//         return {
//           token0Address: token0Address as string,
//           token1Address: token1Address as string,
//           balanceOf: balanceOf as bigint,
//         };
//       } catch (error) {
//         return {
//           token0Address: undefined,
//           token1Address: undefined,
//           balanceOf: 0n,
//         };
//         // console.log(error);
//       }
//     };

//     const fetchTokensList = async () => {
//       let tokens = await Promise.all(
//         poolAddresses.map((address) => fetchTokens(address)),
//       );
//       // filter tokens dont have balance
//       tokens = tokens.filter((token) => {
//         return token.balanceOf > 0;
//       });

//       setToken0Addresses(tokens.map((token) => token.token0Address));
//       setToken1Addresses(tokens.map((token) => token.token1Address));
//     };

//     fetchTokensList();
//   }, [poolAddresses, address]);

//   useEffect(() => {
//     const tokensA = token0Addresses.map(
//       (token0Address) =>
//         tokenList.find(
//           (token) =>
//             token.address.toLowerCase() === token0Address?.toLowerCase(),
//         ) || undefined,
//     );
//     const tokensB = token1Addresses.map(
//       (token1Address) =>
//         tokenList.find(
//           (token) =>
//             token.address.toLowerCase() === token1Address?.toLowerCase(),
//         ) || undefined,
//     );
//     setTokensA(tokensA);
//     setTokensB(tokensB);
//   }, [token0Addresses, token1Addresses, tokenList]);

//   return {
//     tokensA,
//     tokensB,
//   };
// };
