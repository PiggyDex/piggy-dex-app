import Image from "next/image";
import { type FC } from "react";

export const TradeDetails: FC = () => {
  return (
    <div className="text flex w-full items-center justify-end gap-1 self-stretch">
      <div className="text-[16px] font-[400] leading-[19.2px] text-[#BF697E] ">
        Trade Details
      </div>
      <Image src="/swap-drop.svg" alt="" width={24} height={24} />
    </div>
  );
};
