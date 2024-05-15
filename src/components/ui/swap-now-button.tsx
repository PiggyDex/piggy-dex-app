import { Button } from "antd";
import Image from "next/image";
import { type FC } from "react";

type SwapNowButtonProps = {
  handleSwap: () => void;
};

export const SwapNowButton: FC<SwapNowButtonProps> = ({ handleSwap }) => {
  return (
    <Button
      className="flex h-auto items-center justify-center gap-[10px] rounded-[10px] border-0 bg-[#FBF1F3] px-14 py-[10px] text-[#F1D4DB] hover:bg-[#E1A1B1] hover:text-[#58303A]"
      onClick={handleSwap}
    >
      <div className="text-[16px] font-[700] leading-[19.2px]">Swap now</div>
      <Image src="/swap-now.svg" alt="" width={24} height={24} />
    </Button>
  );
};
