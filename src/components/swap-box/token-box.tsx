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
    <div className="bg-[#FBF1F3] flex-col rounded-lg border py-4 px-6 space-y-3">
      <div className="direction-rtl flex justify-between items-center w-full">
        <div className="flex space-x-1 items-center ">
          <Image src="/Bitcoin.svg.png" alt="" width={32} height={32} />
          <p>{tokenSymbol}</p>
        </div>
        <InputNumber
          value={tokenAmount.toString()}
          onChange={handleInputChange}
          className="p-2 w-full border rounded !border-transparent !bg-transparent [&_.ant-input-number-input]:text-right"
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
