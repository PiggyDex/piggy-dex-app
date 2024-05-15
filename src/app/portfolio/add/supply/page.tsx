import { redirect } from "next/navigation";

import { PortfolioManagement, tokenList } from "@/components";
import { Page } from "@/constants";

export default function Portfolio({
  // params,
  searchParams,
}: {
  // params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const tokenA = searchParams?.tokenA;
  const tokenB = searchParams?.tokenB;

  if (tokenA === undefined || tokenB === undefined) {
    redirect("/portfolio/add/");
  }

  const _tokenA = tokenList.find(
    (token) => token.address.toLowerCase() === tokenA.toLowerCase(),
  );
  const _tokenB = tokenList.find(
    (token) => token.address.toLowerCase() === tokenB.toLowerCase(),
  );

  if (!_tokenA && !_tokenB) {
    redirect("/portfolio/add/");
  }

  return (
    <PortfolioManagement
      showPage={Page.AddLiquidity}
      tokenA={_tokenA}
      tokenB={_tokenB}
    />
  );
}
