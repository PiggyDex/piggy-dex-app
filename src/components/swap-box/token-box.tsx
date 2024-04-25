import { InputNumber } from "antd";
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
      <div className="mt-2 direction-rtl flex justify-between items-center w-full">
        <div className="flex space-x-1 items-center">
          <Image src="/Bitcoin.svg.png" alt="" width={32} height={32} />
          <p>{tokenSymbol}</p>
        </div>
        <InputNumber
          defaultValue={tokenAmount}
          onChange={handleInputChange}
          className="p-2 w-full border rounded !outline-transparent [&_.ant-input-number-input]:text-right"
          inputMode="numeric"
          controls={false}
          variant="borderless"
        />
      </div>
      <div>Balance: {accountBalance}</div>
    </div>
  );
};
