"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { WagmiProvider } from "wagmi";
import { confluxESpace } from "wagmi/chains";

import config from "../../wagmi.config";

// Setup queryClient
const queryClient = new QueryClient();

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
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
          <AntdRegistry>{children}</AntdRegistry>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
