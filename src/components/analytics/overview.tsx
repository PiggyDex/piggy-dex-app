import { type FC, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import FeesIcon from "@/assets/analytics/fees.svg";
import TransactionsIcon from "@/assets/analytics/transactions.svg";
import VolumesIcon from "@/assets/analytics/volumes.svg";
import { IntervalsSelect } from "@/components";

export const Overview: FC = () => {
  const DailyFees = "$25,044,986.73";
  const DailyTransactions = "1,234,567";
  const DailyVolumes = "$1,234,567,890.12";

  const [activeLiquidityInterval, setActiveLiquidityInterval] =
    useState<string>("1M");

  const [activeVolumeInterval, setActiveVolumeInterval] =
    useState<string>("1M");

  const data = [
    {
      name: "A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex flex-col items-start justify-center gap-6 self-stretch rounded-xl bg-white px-8 py-6">
          <div className="flex items-center gap-[45px]">
            <span className="text-base font-normal not-italic leading-[120%]">
              Total Liquidity
            </span>
            <IntervalsSelect
              activeInterval={activeLiquidityInterval}
              setActiveInterval={setActiveLiquidityInterval}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold not-italic leading-[120%] text-neutral-900">
              $25,044,986.73
            </span>
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-900">
              {Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(Date.now())}
            </span>
          </div>
          <AreaChart
            width={478}
            height={240}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col items-start justify-center gap-6 self-stretch rounded-xl bg-white px-8 py-6">
          <div className="flex items-center gap-[45px]">
            <span className="text-base font-normal not-italic leading-[120%]">
              Total Volume
            </span>
            <IntervalsSelect
              activeInterval={activeVolumeInterval}
              setActiveInterval={setActiveVolumeInterval}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold not-italic leading-[120%] text-neutral-900">
              $25,044,986.73
            </span>
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-900">
              {Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(Date.now())}
            </span>
          </div>
          <AreaChart
            width={478}
            height={240}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
      <div className="flex flex-row justify-between rounded-xl bg-white px-6 py-4">
        <div className="flex w-full flex-row gap-4">
          <div className="flex items-center justify-center rounded-xl bg-[#fffaf5] p-3">
            <FeesIcon className=" text-[#ff7b47]" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold not-italic leading-[120%] text-neutral-900">
              {DailyFees}
            </span>
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-900">
              24H Fees
            </span>
          </div>
        </div>
        <div className="flex w-full flex-row gap-4">
          <div className="flex items-center justify-center rounded-xl bg-[#fff7fb] p-3">
            <TransactionsIcon className=" text-[#f759aa]" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold not-italic leading-[120%] text-neutral-900">
              {DailyTransactions}
            </span>
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-900">
              24H Transactions
            </span>
          </div>
        </div>
        <div className="flex w-full flex-row gap-4">
          <div className="flex items-center justify-center rounded-xl bg-[#f9f6fd] p-3">
            <VolumesIcon className=" text-[#9154de]" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold not-italic leading-[120%] text-neutral-900">
              {DailyVolumes}
            </span>
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-900">
              24H Volumes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
