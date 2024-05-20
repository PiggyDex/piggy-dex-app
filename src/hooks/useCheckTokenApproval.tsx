import { V2_ROUTER_ADDRESSES } from "@piggy-dex/sdk-core";
import IERC20 from "@piggy-dex/v2-contracts/out/contracts/interfaces/IERC20.sol/IERC20.json";
import { readContract, simulateContract, writeContract } from "@wagmi/core";
import Big from "big.js";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

import { type TokenListProps } from "@/components";
import { convertValueToUnit } from "@/lib";
import config from "@/wagmi.config";

const erc20Abi = IERC20.abi;

export const useCheckTokenApproval = (
  tokens: TokenListProps[],
  tokenAmounts: string[],
): [boolean, boolean[]] => {
  const chainId = useChainId();
  const { address } = useAccount();

  const [approvals, setApprovals] = useState<Big[]>(
    new Array(tokens.length).fill(new Big(0)),
  );
  const [, setApproveTokenFunctions] = useState<
    ((args0: string) => Promise<`0x${string}`>)[]
  >(new Array(tokens.length).fill(() => Promise.resolve("0x")));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [approvedList, setApprovedList] = useState<boolean[]>(
    new Array(tokens.length).fill(false),
  );

  const fetchTokenApproval = useCallback(async () => {
    const fetchingApprovals: Big[] = [];
    for (const token of tokens) {
      try {
        const approval = await readContract(config, {
          abi: erc20Abi,
          address: token.address as `0x${string}`,
          functionName: "allowance",
          args: [address, V2_ROUTER_ADDRESSES[chainId]],
        });
        fetchingApprovals.push(Big(approval as string));
      } catch (error) {
        fetchingApprovals.push(Big(0));
      }
    }
    setApprovals(fetchingApprovals);
  }, [address, chainId, tokens]);

  const setUpApproveTokenFunctions = useCallback(() => {
    const setUpFunctions = [];
    const approvedListTemp = new Array(tokens.length).fill(true);

    for (const [index, token] of tokens.entries()) {
      const needAmount: Big = Big(
        convertValueToUnit(tokenAmounts[index], token.decimals),
      );
      if (approvals[index].gte(needAmount)) {
        setUpFunctions.push(() => Promise.resolve("0x" as `0x${string}`));
      } else {
        approvedListTemp[index] = false;
        const approveTokenFunction = async () => {
          try {
            const { request } = await simulateContract(config, {
              abi: erc20Abi,
              address: token.address as `0x${string}`,
              functionName: "approve",
              args: [V2_ROUTER_ADDRESSES[chainId], needAmount],
              account: address,
            });
            const hash = await writeContract(config, request);
            return hash;
          } catch (err) {
            return "0x" as `0x${string}`;
          }
        };
        setUpFunctions.push(approveTokenFunction);
      }
    }

    setApproveTokenFunctions(setUpFunctions);
    setApprovedList(approvedListTemp);
  }, [approvals, chainId, tokenAmounts, tokens, address]);

  useEffect(() => {
    const fetchApprovals = async () => {
      setIsLoading(true);
      await fetchTokenApproval();
      setIsLoading(false);
    };

    fetchApprovals();
  }, [fetchTokenApproval]);

  useEffect(() => {
    if (!isLoading) {
      setUpApproveTokenFunctions();
    }
  }, [approvals, isLoading, setUpApproveTokenFunctions]);

  return [isLoading, approvedList] as const;
};
