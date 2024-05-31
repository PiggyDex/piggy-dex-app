import { useGetTokenBalance } from "@/hooks";
import { type TokenInterface } from "@/types";

import { convertUnitToValue } from "./utils";

export function GetTokenBalance(token: TokenInterface) {
  const balance = useGetTokenBalance(token);
  const formattedBalance = convertUnitToValue(balance, token.decimals).slice(
    0,
    9,
  );
  return formattedBalance;
}
