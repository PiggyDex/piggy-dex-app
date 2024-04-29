import Image from "next/image";
import { type FC } from "react";

export const Empty: FC = () => {
  return (
    <div className="flex flex-col rounded-[15px] bg-white text-black py-8 gap-8 items-center self-stretch">
      <Image src="/profit.svg" alt="profit" width={218} height={210} />
      <span className="text-[16px] leading-[19.2px] font-normal">
        You do not have any liquidity yet, create one now!
      </span>
      <Image
        src="/connect-wallet.svg"
        alt="connect-wallet"
        width={219}
        height={100}
      />
    </div>
  );
};
