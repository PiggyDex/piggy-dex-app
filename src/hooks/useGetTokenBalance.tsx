import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import { readContract } from "@wagmi/core";
import Big from "big.js"; // Import Big.js
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { type TokenListProps } from "@/components";
import config from "@/wagmi.config";

const erc20Abi = IERC20.abi;

export const useGetTokenBalance = (token: TokenListProps): string => {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected) {
        const result = await readContract(config, {
          abi: erc20Abi,
          address: token.address as `0x${string}`,
          functionName: "balanceOf",
          args: [address],
        });

        // Convert the result to a Big instance and then call toFixed
        const balanceInBig = new Big((result as Big).toString());
        setBalance(balanceInBig.toFixed());
      }
    };

    fetchBalance();
  }, [token, address, isConnected]);

  return balance;
};
