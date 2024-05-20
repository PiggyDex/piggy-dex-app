"use client";

import { type FC, type ReactNode, useState } from "react";

import { CustomConnectButton, StyledTabs } from "@/components";

import { Overview } from "./overview";

export const AnalyticsTab: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");

  const Topicmap: Record<string, ReactNode> = {
    Overview: <Overview />,
    Pair: <div>Pair</div>,
    Token: <div>Token</div>,
  };

  return (
    <div className="flex h-screen w-full flex-col gap-6 bg-neutral-50 px-8 py-2">
      <div className="flex items-center justify-between py-6">
        <span className="text-2xl font-bold not-italic leading-[120%]">
          Piggy DEX Info & Analytics
        </span>
        <CustomConnectButton className="relative right-0 top-0" />
      </div>
      <StyledTabs
        items={["Overview", "Pair", "Token"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {Topicmap[activeTab]}
    </div>
  );
};
