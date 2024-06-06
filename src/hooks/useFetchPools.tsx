"use client";

import Factory from "@piggy-dex/v2-contracts/out/UniswapV2Factory.sol/UniswapV2Factory.json";
import { FACTORY_ADDRESS_MAP } from "@piggy-dex/v2-sdk";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

import config from "@/wagmi.config";

const factoryAbi = Factory.abi;

export const useFetchPools = (): {
  poolAddress: string[];
} => {
  const chainId = useChainId();
  const [poolAddress, setPoolAddress] = useState<string[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      const factoryAddress = FACTORY_ADDRESS_MAP[chainId];

      try {
        const length = await readContract(config, {
          abi: factoryAbi,
          address: factoryAddress as `0x${string}`,
          functionName: "allPairsLength",
          args: [],
        });
        const pools = [];
        for (let i = 0; i < (length as number); i++) {
          const poolAddress = await readContract(config, {
            abi: factoryAbi,
            address: factoryAddress as `0x${string}`,
            functionName: "allPairs",
            args: [i],
          });
          pools.push(poolAddress as string);
        }
        setPoolAddress(pools);
      } catch (e) {
        // console.log(e);
      }
    };

    fetchPools();
  }, [chainId]);

  return {
    poolAddress,
  };
};
