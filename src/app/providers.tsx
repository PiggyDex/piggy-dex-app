"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import NiceModal from "@ebay/nice-modal-react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider, createStore } from "jotai";
import { type FC } from "react";
import { WagmiProvider } from "wagmi";
import { confluxESpaceTestnet } from "wagmi/chains";

import config from "@/wagmi.config";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const jotaiStore = createStore();

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <JotaiProvider store={jotaiStore}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            coolMode
            theme={darkTheme({
              accentColor:
                "linear-gradient(90deg, rgba(244,190,204,1) 0%, rgba(209,157,222,1) 100%)",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
            initialChain={confluxESpaceTestnet}
          >
            <AntdRegistry>
              <NiceModal.Provider>{children}</NiceModal.Provider>
            </AntdRegistry>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
};
