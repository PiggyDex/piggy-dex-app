"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NiceModal from "@ebay/nice-modal-react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider, createStore } from "jotai";
import { type FC } from "react";
import { WagmiProvider } from "wagmi";
import { confluxESpace } from "wagmi/chains";

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
            theme={darkTheme({
              accentColor:
                "linear-gradient(90deg, rgba(244,190,204,1) 0%, rgba(209,157,222,1) 100%)",
              accentColorForeground: "black",
              borderRadius: "medium",
            })}
            initialChain={confluxESpace}
          >
            <AntdRegistry>
              <StyleProvider>
                <NiceModal.Provider>{children}</NiceModal.Provider>
              </StyleProvider>
            </AntdRegistry>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
};
