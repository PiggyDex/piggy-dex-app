import Image from "next/image";
import { type FC, useEffect } from "react";

import { GetTokenBalance } from "@/lib";
import { type TokenInterface } from "@/types";

type ShowTokenInterface = {
  maxSelect: number;
  tokenList: TokenInterface[];
  usingTokens: TokenInterface[];
  setUsingTokens: (newUsingTokens: TokenInterface[]) => void;
  updateTokenList: (newTokenList: TokenInterface[]) => void;
};

export const ShowTokenList: FC<ShowTokenInterface> = ({
  maxSelect,
  tokenList,
  usingTokens,
  setUsingTokens,
  updateTokenList,
}) => {
  useEffect(() => {
    updateTokenList(tokenList);
  }, [tokenList, updateTokenList]);

  return (
    <div className="flex max-h-[60vh] flex-[1_0_0%] flex-col items-start gap-6 overflow-y-scroll pr-3">
      {tokenList.map((token, index) => {
        const displayBlance = GetTokenBalance(token);
        // parseInt(token.balance) / 10 ** parseInt(token.decimals);
        return (
          <div
            key={index}
            className="flex items-center gap-[13px] self-stretch hover:cursor-pointer	"
            onClick={() => {
              if (usingTokens.includes(token)) {
                setUsingTokens(usingTokens.filter((t) => t !== token));
              } else {
                if (usingTokens.length < maxSelect) {
                  setUsingTokens([...usingTokens, token]);
                }
              }
            }}
          >
            <Image src="/ethereum-eth.svg" alt="eth" width={25} height={25} />
            <div className="flex flex-[1_0_0%] flex-col items-start justify-center gap-1">
              <div className="text-[16px] font-[400] leading-[19.2px]">
                {token.symbol}
              </div>
              <div className="text-[12px] leading-[14.4px]">{token.name}</div>
            </div>
            <div className="flex flex-col items-end justify-center gap-1 text-[16px] font-[400] leading-[19.2px]">
              {displayBlance.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};
