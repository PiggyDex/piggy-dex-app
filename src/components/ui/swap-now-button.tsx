import { Button } from "antd";
import Image from "next/image";
import { type FC } from "react";

type SwapNowButtonProps = {
  handleSwap: () => void;
  text: string;
};

export const SwapNowButton: FC<SwapNowButtonProps> = ({ handleSwap, text }) => {
  return (
    <Button
      className="flex h-auto items-center justify-center gap-[10px] rounded-[10px] border-0 bg-primary-200 px-14 py-[10px] text-primary-900 hover:bg-primary-400"
      onClick={handleSwap}
    >
      <span className="text-[16px] font-[700] leading-[19.2px]">{text}</span>
      <Image src="/swap-now.svg" alt="" width={24} height={24} />
    </Button>
  );
};
