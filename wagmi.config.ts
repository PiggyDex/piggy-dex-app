"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import dotenv from "dotenv";
import { confluxESpace, confluxESpaceTestnet } from "wagmi/chains";

dotenv.config();

export const projectId =
  process.env.WALLET_CONNECT_PROJECT_ID || "get_project_id";

const config = getDefaultConfig({
  appName: "piggy-dex-app",
  projectId,
  chains: [confluxESpace, confluxESpaceTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
