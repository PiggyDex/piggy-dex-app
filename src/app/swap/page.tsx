"use client";

import { redirect } from "next/navigation";
import { useChainId } from "wagmi";

import { SwapBox } from "@/components";
import { useTokenList } from "@/hooks";

export default function Swap({
  // params,
  searchParams,
}: {
  // params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const tokenA = searchParams?.tokenA;
  const tokenB = searchParams?.tokenB;

  const chainId = useChainId();
  const { tokenList } = useTokenList(chainId);

  const _tokenA = tokenList.find((token) => token.address === tokenA);
  const _tokenB = tokenList.find((token) => token.address === tokenB);

  if (_tokenA === undefined || _tokenB === undefined) {
    redirect(
      `/swap?tokenA=${tokenList[1].address}&tokenB=${tokenList[3].address}`,
    );
  }

  return <SwapBox tokenA={_tokenA} tokenB={_tokenB} />;
}
