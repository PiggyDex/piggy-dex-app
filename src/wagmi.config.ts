import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { confluxESpace, confluxESpaceTestnet } from "wagmi/chains";

export const projectId =
  process.env.WALLET_CONNECT_PROJECT_ID || "get_project_id";

const config = getDefaultConfig({
  appName: "piggy-dex-app",
  projectId,
  chains: [confluxESpace, confluxESpaceTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
