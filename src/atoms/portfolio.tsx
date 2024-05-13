import { atom } from "jotai";

import { type Pool } from "@/types";

type Pools = {
  pools: Pool[];
};

export const portfolioPoolStateAtom = atom<Pools>({
  pools: [],
});
