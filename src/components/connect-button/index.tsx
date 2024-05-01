"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { type FC } from "react";

type CustomConnectButtonProps = {
  px?: number; // pixel
  py?: number; // pixel
  fontSize?: number; // pixel
  fontWeight?: number; // pixel
  lineHeight?: number; // pixel
  borderRadius?: number; // pixel
};

export const CustomConnectButton: FC<CustomConnectButtonProps> = ({
  px,
  py,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {/* // className={`py-[${py}px] px-[${px}px]  leading-[${lineHeight}px] rounded-[${borderRadius}px] bg-gradient-to-r from-[#F4BECC] to-[#D19DDE] font-[700] text-[#58303A]`} */}
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex items-center justify-center gap-[10px]"
                    style={{
                      padding: `${py}px ${px}px`,
                      background:
                        "linear-gradient(90deg, rgba(244,190,204,1) 0%, rgba(209,157,222,1) 100%)",
                      fontWeight: `${fontWeight}`,
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}px`,
                      color: "#58303A",
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    Connect wallet
                    <Image
                      src="/wallet-icon.svg"
                      alt="wallet-icon"
                      width={24}
                      height={24}
                    ></Image>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                          // account,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
