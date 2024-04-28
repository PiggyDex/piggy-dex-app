import Image from "next/image";
import { type FC } from "react";

import { NavigationTab } from "./NavigationTab";

export const Navbar: FC = () => {
  return (
    <div className="sticky flex h-screen basis-1/5 flex-col justify-between bg-navbar py-6">
      <div className="flex flex-col pt-6">
        <div className="p-4">
          <Image
            src={"/logo-w-text.svg"}
            alt={""}
            width={160}
            height={32}
            className="m-auto"
          />
        </div>
        <div className="px-4 py-5">
          <span className="text-base text-[#FBF1F3]">Service</span>
        </div>
        <NavigationTab svgSource="/icons/user-square.svg" text="Portfolio" />
        <NavigationTab svgSource="/icons/refresh.svg" text="Swap" />
        <NavigationTab svgSource="/icons/usd-square.svg" text="Earn" />
        <NavigationTab svgSource="/icons/comparison.svg" text="Analytics" />
        <NavigationTab svgSource="/icons/exchange-alt.svg" text="Bridge" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex h-8 px-4">
          <span className="text-[#FBF1F3]">Account</span>
        </div>
        <div>
          <div className="flex p-4">
            <Image src={"icons/setting.svg"} alt={""} width={24} height={24} />
            <span className="pl-2 text-base text-[#FBF1F3]">Setting</span>
          </div>
          <div className="flex p-4">
            <Image src={"icons/setting.svg"} alt={""} width={24} height={24} />
            <span className="pl-2 text-base text-[#FBF1F3]">Setting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
