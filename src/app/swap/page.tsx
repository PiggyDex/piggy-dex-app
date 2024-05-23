import { redirect } from "next/navigation";

import { SwapBox, tokenList } from "@/components";

export default function Swap({
  // params,
  searchParams,
}: {
  // params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const tokenA = searchParams?.tokenA;
  const tokenB = searchParams?.tokenB;

  const _tokenA = tokenList.find((token) => token.address === tokenA);
  const _tokenB = tokenList.find((token) => token.address === tokenB);

  if (_tokenA === undefined || _tokenB === undefined) {
    redirect(
      `/swap?tokenA=${tokenList[0].address}&tokenB=${tokenList[1].address}`,
    );
  }

  return <SwapBox tokenA={_tokenA} tokenB={_tokenB} />;
}
