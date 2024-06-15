"use client";

import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import { getBalance, readContract } from "@wagmi/core";
import Big from "big.js"; // Import Big.js
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { type TokenInterface } from "@/types";
import config from "@/wagmi.config";

const erc20Abi = IERC20.abi;

const NATIVE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";

export const useGetTokenBalance = (token: TokenInterface): string => {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected) {
        if (token.address !== NATIVE_TOKEN_ADDRESS) {
          try {
            const result = await readContract(config, {
              abi: erc20Abi,
              address: token.address as `0x${string}`,
              functionName: "balanceOf",
              args: [address],
            });
            // Convert the result to a Big instance and then call toFixed
            const balanceInBig = new Big((result as Big).toString());
            setBalance(balanceInBig.toFixed(9));
          } catch (error) {
            setBalance("0");
          }
        } else {
          if (address) {
            const result = await getBalance(config, {
              address,
            });
            const balanceInBig = new Big(result.value.toString());
            setBalance(balanceInBig.toFixed(9));
          }
        }
      }
    };

    fetchBalance();
  }, [token, address, isConnected, balance]);

  return balance;
};
