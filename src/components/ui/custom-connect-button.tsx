"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { type FC } from "react";

import WalletIcon from "@/assets/wallet-icon.svg";
import { cn } from "@/lib";

type CustomConnectButtonProps = {
  className?: string;
  buttonClassName?: string;
};

export const CustomConnectButton: FC<CustomConnectButtonProps> = ({
  className,
  buttonClassName,
}) => {
  buttonClassName = cn(
    buttonClassName,
    "text-[#58303A] outline-none text-base not-italic font-bold leading-[120%] px-6 py-3 rounded-xl hover:cursor-pointer",
  );

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
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            className={cn("absolute right-16 top-12 [&_*]:border-0", className)}
            // {...(!ready && {
            // 	"aria-hidden": true,
            // 	style: {
            // 		opacity: 0,
            // 		pointerEvents: "none",
            // 		userSelect: "none",
            // 	},
            // })}
          >
            {/* // className={`py-[${py}px] px-[${px}px]  leading-[${lineHeight}px] rounded-[${borderRadius}px] bg-gradient-to-r from-[#F4BECC] to-[#D19DDE] font-[700] text-[#58303A]`} */}
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={cn(
                      "flex items-center justify-center gap-[10px]",
                      buttonClassName,
                    )}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(244,190,204,1) 0%, rgba(209,157,222,1) 100%)",
                    }}
                  >
                    Connect wallet
                    <WalletIcon className="text-[#864A59]" />
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={cn(
                      "text-primary-500 bg-warning-500 border-none",
                      buttonClassName,
                    )}
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-3">
                  <div className="flex items-center gap-3 rounded-xl bg-white p-3">
                    <div className="absolute left-0 h-6 w-[2px] rounded-r-full bg-primary" />
                    <span className="text-center text-xs font-bold not-italic leading-[120%] text-[#1E2029]/60">
                      Your balance
                    </span>
                    <span className="text-center text-xl font-bold not-italic leading-[120%]">
                      {account.displayBalance ? account.displayBalance : ""}
                    </span>
                  </div>
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={cn(
                      "flex gap-2 px-6 py-2, items-center !rounded-xl !border !border-primary-600 !bg-transparent outline-none",
                      buttonClassName,
                    )}
                  >
                    {/* {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                        }}
                        className="mr-1 h-3 w-3 overflow-hidden rounded-full"
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    )} */}
                    <span>{chain.name}</span>
                    <Image
                      src="/arrow-head-down.svg"
                      alt="arrow-head-down"
                      width={24}
                      height={24}
                    />
                  </button>
                  <button
                    className="!flex !items-center !justify-center !gap-2 !self-stretch !rounded-xl !border !border-primary-600 !bg-transparent px-6 py-2 outline-none hover:cursor-pointer"
                    onClick={openAccountModal}
                    type="button"
                  >
                    <span className="text-base font-bold not-italic leading-[120%] text-primary-600">
                      {account.displayName}
                    </span>
                    <WalletIcon className="text-[#864A59]" />
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
