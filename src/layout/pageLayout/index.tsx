"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import NiceModal from "@ebay/nice-modal-react";
import { type FC, type ReactNode } from "react";

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyleProvider>
      <NiceModal.Provider>
        <main className="flex items-start overflow-x-hidden">{children}</main>
      </NiceModal.Provider>
    </StyleProvider>
  );
};
