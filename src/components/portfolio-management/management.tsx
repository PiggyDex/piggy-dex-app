"use client";

import UniswapV2Pair from "@piggy-dex/v2-contracts/out/UniswapV2Pair.sol/UniswapV2Pair.json";
import { readContract } from "@wagmi/core";
import { Button, Table, Tabs, type TabsProps } from "antd";
import Image from "next/image";
import { type FC, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import AddLiquiditySvg from "@/assets/add-liquidity.svg";
import { TabName } from "@/components";
import { useFetchPools, useFetchingPoolTokensFromAddresses } from "@/hooks";
import { type TokenInterface } from "@/types";
import config from "@/wagmi.config";

import { Empty } from "./empty";

const pairAbi = UniswapV2Pair.abi;

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Pool",
    dataIndex: "pool",
    key: "pool",
  },
  {
    title: "Liquidity",
    dataIndex: "liquidity",
    key: "liquidity",
  },
  {
    title: "Volume (24h)",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "Fees (24h)",
    dataIndex: "fees",
    key: "fees",
  },
  {
    title: "APR (24h)",
    dataIndex: "apr",
    key: "apr",
  },
];

const createDataSource = (
  poolAddress: string[],
  tokensA: (TokenInterface | undefined)[],
  tokensB: (TokenInterface | undefined)[],
) => {
  return poolAddress.map((address, index) => {
    const tokenA = tokensA[index];
    const tokenB = tokensB[index];
    const logoA = tokenA?.logoURI;
    const logoB = tokenB?.logoURI;

    return {
      key: index,
      index: index + 1,
      pool:
        tokenA && tokenB && logoA && logoB ? (
          <div className="flex items-center gap-1">
            <div className="relative h-7 w-7">
              <Image
                src={logoA}
                alt="icon"
                width={24}
                height={24}
                className="object-cover"
              />
              <Image
                src={logoB}
                alt="icon"
                width={18}
                height={18}
                className="absolute bottom-0 right-0 object-cover"
              />
            </div>
            <span>
              {tokenA.symbol}/{tokenB.symbol}
            </span>
          </div>
        ) : (
          `loading`
        ),
      // pool: "wtf",
      liquidity: "0",
      volume: "0",
      fees: "0",
      apr: "0",
    };
  });
};

export const TableAllPool: FC = () => {
  const { poolAddress } = useFetchPools();

  const { tokensA, tokensB } = useFetchingPoolTokensFromAddresses(poolAddress);

  const dataSource = useMemo(() => {
    return createDataSource(poolAddress, tokensA, tokensB);
  }, [poolAddress, tokensA, tokensB]);

  return <Table size="large" dataSource={dataSource} columns={columns} />;
};

export const TableMyPosition: FC = () => {
  const { poolAddress } = useFetchPools();

  const { tokensA, tokensB } = useFetchingPoolTokensFromAddresses(poolAddress);

  const { address } = useAccount();

  const [ownPool, setOwnPool] = useState<string[]>([]);
  const [ownTokensA, setOwnTokensA] = useState<(TokenInterface | undefined)[]>(
    [],
  );
  const [ownTokensB, setOwnTokensB] = useState<(TokenInterface | undefined)[]>(
    [],
  );

  useEffect(() => {
    const isHaveLp = async (pool: string) => {
      const balanceOf = await readContract(config, {
        abi: pairAbi,
        address: pool as `0x${string}`,
        functionName: "balanceOf",
        args: [address],
      });
      return (balanceOf as bigint) > 0;
    };

    const getPool = async () => {
      const ownPool = [];
      const ownTokensA = [];
      const ownTokensB = [];
      for (const [index, pool] of poolAddress.entries()) {
        if (await isHaveLp(pool)) {
          ownPool.push(pool);
          ownTokensA.push(tokensA[index]);
          ownTokensB.push(tokensB[index]);
        }
      }
      setOwnPool(ownPool);
      setOwnTokensA(ownTokensA);
      setOwnTokensB(ownTokensB);
    };

    getPool();
  }, [address, poolAddress, tokensA, tokensB]);

  const dataSource = useMemo(() => {
    return createDataSource(ownPool, ownTokensA, ownTokensB);
  }, [ownPool, ownTokensA, ownTokensB]);

  if (tokensA.length && tokensB.length) {
    return <Table size="large" dataSource={dataSource} columns={columns} />;
  }

  return <Empty />;
};

export const Management: FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <TabName name="Pools" />,
      children: <TableAllPool />,
    },
    {
      key: "2",
      label: <TabName name="My position" />,
      children: <TableMyPosition />,
    },
  ];

  const { address } = useAccount();

  if (!address) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 text-black">
      <div className="flex items-start gap-1 self-stretch">
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="w-full [&_.ant-tabs-ink-bar]:bg-[#BF697E] [&_.ant-tabs-nav]:mb-6 [&_.ant-tabs-tab]:px-6 [&_.ant-tabs-tab]:py-3"
          onChange={() => {
            // TODO: change display token list
          }}
          tabBarExtraContent={
            <div className="flex items-center gap-1 align-middle">
              <Button className="flex items-center border-0 px-3 py-1">
                Filter By Token
                <Image
                  src="/swap-more.svg"
                  alt="swap-more"
                  width={24}
                  height={24}
                />
              </Button>
              <Button className="border-1 flex h-auto items-center justify-center gap-[10px] rounded-[10px] border-solid border-[#D2738B] px-6 py-[10px] text-[14px] text-[#D2738B] text-[700]">
                Create Pool
                <AddLiquiditySvg color="white"></AddLiquiditySvg>
              </Button>
              <Button className="border-1 flex h-auto items-center justify-center gap-[10px] rounded-[10px] border-solid border-[#D2738B] bg-[#E1A1B1] px-6 py-[10px] text-[14px] text-[#D2738B] text-[700]">
                Add Liquidity
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};
