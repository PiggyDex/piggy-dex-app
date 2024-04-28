import { InputNumber, type InputNumberProps } from "antd";
import Image from "next/image";
import { type FC } from "react";

type TokenBoxProps = {
  tokenSymbol: string;
  tokenAmount: string | number;
  accountBalance: number;
  handleInputChange?: InputNumberProps["onChange"];
};

export const TokenBox: FC<TokenBoxProps> = ({
  tokenSymbol,
  tokenAmount,
  accountBalance,
  handleInputChange,
}) => {
  return (
    <div className="flex-col space-y-3 rounded-lg border bg-[#FBF1F3] px-6 py-4">
      <div className="direction-rtl flex w-full items-center justify-between">
        <div className="flex items-center space-x-1 ">
          <Image src="/Bitcoin.svg.png" alt="" width={32} height={32} />
          <p>{tokenSymbol}</p>
        </div>
        <InputNumber
          value={tokenAmount.toString()}
          onChange={handleInputChange}
          className="w-full rounded border !border-transparent !bg-transparent p-2 [&_.ant-input-number-input]:text-right"
          inputMode="numeric"
          controls={false}
          variant="borderless"
          step="0.000000001"
          precision={9}
          max="1000000000"
          stringMode
        />
      </div>
      <div>Balance: {accountBalance}</div>
    </div>
  );
};
