import Image from "next/image";
import { type FC } from "react";

type TokenBoxProps = {
  tokenSymbol: string;
  tokenAmount: number;
  accountBalance: number;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TokenBox: FC<TokenBoxProps> = ({
  tokenSymbol,
  tokenAmount,
  accountBalance,
  handleInputChange,
}) => {
  return (
    <div className="bg-[#FBF1F3] flex-col rounded-lg border py-4 px-6 space-y-3">
      <div className="mt-2 flex justify-between items-center w-full">
        <div className="flex space-x-1 items-center">
          <Image src="/Bitcoin.svg.png" alt="" width={32} height={32} />
          <p>{tokenSymbol}</p>
        </div>
        <input
          value={tokenAmount}
          onChange={handleInputChange}
          className="p-2 w-full text-right border rounded bg-transparent border-transparent focus:border-transparent focus:outline-none"
          inputMode="numeric"
        />
      </div>
      <div>Balance: {accountBalance}</div>
    </div>
  );
};
