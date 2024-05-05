"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import NiceModal from "@ebay/nice-modal-react";

import { PortfolioManagement, SwapBox } from "@/components";

export default function Home() {
  return (
    <StyleProvider hashPriority="high">
      <NiceModal.Provider>
        <main className="flex flex-col items-center justify-between overflow-x-hidden bg-[#FBF1F3] p-[36px]">
          <SwapBox />
          <PortfolioManagement />
        </main>
      </NiceModal.Provider>
    </StyleProvider>
  );
}
