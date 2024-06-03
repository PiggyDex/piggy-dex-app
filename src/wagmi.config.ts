import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { confluxESpace, confluxESpaceTestnet } from "wagmi/chains";

export const projectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "get_project_id";

const config = getDefaultConfig({
  appName: "piggy-dex-app",
  projectId,
  chains: [confluxESpace, confluxESpaceTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [confluxESpaceTestnet.id]: http(
      `https://evmtestnet.confluxrpc.com/${process.env.NEXT_PUBLIC_RPC_API_KEY}`,
    ),
    [confluxESpace.id]: http("https://evm.confluxrpc.com"),
  },
});

export default config;
