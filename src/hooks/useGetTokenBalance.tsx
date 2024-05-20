import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import Big from "big.js";
import { useAccount, useReadContract } from "wagmi";

import { type TokenListProps } from "@/components";

const erc20Abi = IERC20.abi;

export const useGetTokenBalance = (token: TokenListProps) => {
  const { address } = useAccount();

  const { data: tokenBalance, isLoading } = useReadContract({
    abi: erc20Abi,
    address: token.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  return isLoading ? "0" : Big(tokenBalance as Big).toFixed();
};
