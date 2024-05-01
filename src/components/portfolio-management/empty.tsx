import Image from "next/image";
import { type FC } from "react";

import { CustomConnectButton } from "../connect-button/index";

export const Empty: FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 self-stretch rounded-[15px] bg-white py-8 text-black">
      <Image src="/profit.svg" alt="profit" width={218} height={210} />
      <span className="text-[16px] font-normal leading-[19.2px]">
        You do not have any liquidity yet, create one now!
      </span>
      {/* <Image
        src="/connect-wallet.svg"
        alt="connect-wallet"
        width={219}
        height={100}
      /> */}
      <CustomConnectButton
        px={30}
        py={10}
        fontSize={16}
        fontWeight={700}
        lineHeight={19.2}
        borderRadius={10}
      />
    </div>
  );
};
