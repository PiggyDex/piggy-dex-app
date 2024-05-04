"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "antd";

import { Navbar, SelectTokenModal, SwapBox } from "@/components";

export default function Home() {
  const modal = useModal(SelectTokenModal);

  return (
    <StyleProvider hashPriority="high">
      <NiceModal.Provider>
        <main className="flex flex-col items-center justify-between overflow-x-hidden">
          <Navbar />
          <Button
            type="primary"
            onClick={() =>
              modal.show({
                maxSelect: 2,
                // closeAfterSelecting: true,
                onlyShowAllTokens: false,
              })
            }
          >
            Show Modal
          </Button>
          <ConnectButton />
          <SwapBox />
        </main>
      </NiceModal.Provider>
    </StyleProvider>
  );
}
