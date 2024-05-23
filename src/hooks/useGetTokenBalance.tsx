import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import Big from "big.js";
import { useAccount, useBalance, useReadContract } from "wagmi";

import { type TokenInterface } from "@/types";

const erc20Abi = IERC20.abi;

const NATIVE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";

const GetNativeBalance = () => {
  const { address } = useAccount();
  const { data: nativeBalance, isLoading } = useBalance({
    address,
  });

  return isLoading ? "0" : nativeBalance?.value;
};

export const useGetTokenBalance = (token: TokenInterface) => {
  const { address } = useAccount();

  const { data: tokenBalance, isLoading } = useReadContract({
    abi: erc20Abi,
    address: token.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  if (token.address === NATIVE_TOKEN_ADDRESS) {
    return GetNativeBalance();
  }

  return isLoading ? "0" : Big(tokenBalance as Big).toFixed();
};
