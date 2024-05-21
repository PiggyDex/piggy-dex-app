"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, Input, Modal, Tabs, type TabsProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

import { Page } from "@/constants";

import { tokenList } from "./demo-token-list";
import { ShowTokenList } from "./show-token-list";

export type TokenListProps = {
  chainId: 71 | 1030;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
};

type TabNameProps = {
  name: string;
};

const TabName: FC<TabNameProps> = ({ name }) => {
  return (
    <div className="flex items-center gap-[10px] text-[16px] font-[400] leading-[19.2px] tracking-[0.4px] text-[#BF697E]">
      {name}
    </div>
  );
};

export const SelectTokenModal = NiceModal.create(
  ({
    usingTokens,
    setUsingTokens,
    title,
    maxSelect,
    // closeAfterSelecting,
    onlyShowAllTokens,
    showPageAfterSelect,
  }: {
    usingTokens: TokenListProps[];
    setUsingTokens: (newUsingTokens: TokenListProps[]) => void;
    title: string;
    maxSelect: number;
    // closeAfterSelecting: boolean;
    onlyShowAllTokens: boolean;
    showPageAfterSelect?: number;
  }) => {
    const modal = useModal();
    const router = useRouter();

    const [displayTokenList, setDisplayTokenList] =
      useState<TokenListProps[]>(tokenList);
    const [chosenTokens, setChosenTokens] = useState<TokenListProps[]>([]);

    const items: TabsProps["items"] = [
      {
        key: "1",
        label: <TabName name="Verified Token" />,
        children: (
          <ShowTokenList
            maxSelect={maxSelect}
            tokenList={displayTokenList}
            usingTokens={chosenTokens}
            setUsingTokens={setChosenTokens}
            updateTokenList={setDisplayTokenList}
          />
        ),
      },
      {
        key: "2",
        label: <TabName name="All Token" />,
        children: (
          <ShowTokenList
            maxSelect={maxSelect}
            tokenList={displayTokenList}
            usingTokens={chosenTokens}
            setUsingTokens={setChosenTokens}
            updateTokenList={setDisplayTokenList}
          />
        ),
      },
    ];

    const classNames = {
      body: "flex flex-col w-full gap-3",
      mask: "",
      header: "w-full",
      footer: "w-full mt-0",
      content:
        "flex flex-col items-start gap-3 rounded-[15px] bg-white p-6 max-w-[498px]",
      wrap: "",
    };

    return (
      <Modal
        title={
          <div className="flex w-full items-center self-stretch">
            <span className="flex flex-[1_1_0%] items-center gap-[10px] text-[20px] font-[400] leading-[24px] tracking-[0.4px]">
              Select Token
            </span>
            <Image
              src="/close.svg"
              alt="close-modal"
              width={20}
              height={20}
              className="hover:cursor-pointer"
              onClick={() => {
                modal.hide();
              }}
            />
          </div>
        }
        footer={
          <Button
            type="primary"
            disabled={chosenTokens.length !== maxSelect}
            className="flex h-auto w-full items-center justify-center self-stretch rounded-[10px] bg-[#E1A1B1] px-6 py-[10px] text-[16px] font-[700] leading-[19.2px] text-[#58303A] disabled:bg-[#FBF1F3] disabled:text-[#F1D4DB]"
            onClick={() => {
              modal.hide();
              setUsingTokens(chosenTokens);
              if (
                showPageAfterSelect &&
                (showPageAfterSelect & Page.Supply) > 0
              ) {
                router.push(
                  `/portfolio/add/supply?tokenA=${chosenTokens[0].address}&tokenB=${chosenTokens[1].address}`,
                );
              }
            }}
          >
            {title}
          </Button>
        }
        closable={false}
        keyboard={false}
        open={modal.visible}
        onOk={modal.hide}
        onCancel={modal.hide}
        afterClose={modal.remove}
        classNames={classNames}
        centered
      >
        <div className="h-px bg-[#FBF1F3]"></div>
        <Input
          variant="borderless"
          placeholder="Type a token/coin name or paste its address"
          className="flex items-center self-stretch rounded-[10px] border border-solid border-[#929292] p-4 text-[16px] font-[400] leading-[19.2px] text-black placeholder:text-[#929292] focus:border-[#E1A1B1]"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.value.length === 0) {
              setDisplayTokenList(tokenList);
              return;
            }
            const FilterTokenList = tokenList.filter((token) =>
              e.target.value
                .toLowerCase()
                .includes(token.address.toLowerCase()),
            );
            setDisplayTokenList(FilterTokenList);
          }}
        />
        {!onlyShowAllTokens && (
          <Tabs
            defaultActiveKey="1"
            items={items}
            className="[&_.ant-tabs-ink-bar]:bg-[#BF697E] [&_.ant-tabs-nav]:mb-3 [&_.ant-tabs-tab]:m-0 [&_.ant-tabs-tab]:px-6 [&_.ant-tabs-tab]:py-3"
            onChange={() => {
              // TODO: change display token list
            }}
          />
        )}

        {onlyShowAllTokens && (
          <ShowTokenList
            maxSelect={maxSelect}
            tokenList={tokenList}
            usingTokens={usingTokens}
            setUsingTokens={setUsingTokens}
            updateTokenList={setDisplayTokenList}
          />
        )}
        {chosenTokens.length > 0 && (
          <div className="flex items-start gap-2 self-stretch">
            {chosenTokens.map((token, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-1 rounded-[10px] border border-solid border-[#929292] px-2 py-1"
                >
                  <Image
                    src="/ethereum-eth.svg"
                    alt="eth"
                    width={24}
                    height={24}
                  />
                  <div className="text-[12px] font-[400] leading-[14.4px]">
                    {token.symbol}
                  </div>
                  <Image
                    src="/small-close.svg"
                    alt="close"
                    width={12}
                    height={12}
                    className="flex items-start rounded bg-[#FFEAEA] p-[2px] hover:cursor-pointer"
                    onClick={() => {
                      setChosenTokens(chosenTokens.filter((t) => t !== token));
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    );
  },
);
