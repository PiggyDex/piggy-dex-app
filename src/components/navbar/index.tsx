import Image from "next/image";
import { type FC } from "react";

import { NavigationTab } from "./NavigationTab";

export const Navbar: FC = () => {
  return (
    <div className="sticky flex flex-col justify-between basis-1/5 h-screen bg-navbar py-6">
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
        <div className="py-5 px-4">
          <span className="text-[#FBF1F3] text-base">Service</span>
        </div>
        <NavigationTab svgSource="/icons/user-square.svg" text="Portfolio" />
        <NavigationTab svgSource="/icons/refresh.svg" text="Swap" />
        <NavigationTab svgSource="/icons/usd-square.svg" text="Earn" />
        <NavigationTab svgSource="/icons/comparison.svg" text="Analytics" />
        <NavigationTab svgSource="/icons/exchange-alt.svg" text="Bridge" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex px-4 h-8">
          <span className="text-[#FBF1F3]">Account</span>
        </div>
        <div>
          <div className="p-4 flex">
            <Image src={"icons/setting.svg"} alt={""} width={24} height={24} />
            <span className="text-[#FBF1F3] text-base pl-2">Setting</span>
          </div>
          <div className="p-4 flex">
            <Image src={"icons/setting.svg"} alt={""} width={24} height={24} />
            <span className="text-[#FBF1F3] text-base pl-2">Setting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
