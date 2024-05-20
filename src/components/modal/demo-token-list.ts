import all from "@piggy-dex/token-list/build/all.json";

import { type TokenListProps } from "./select-token";

const filterTokenList = all.filter((token) => token.chainId === 71);

export const tokenList: TokenListProps[] = filterTokenList;
