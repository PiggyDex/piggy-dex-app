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
    <div className="flex-col items-start gap-3 self-stretch rounded-[10px] border border-solid border-[#E1A1B1] bg-[#FBF1F3] px-6 py-[16px]">
      <div className="flex w-full items-center self-stretch">
        <div className="flex items-center space-x-1 ">
          <Image src="/Bitcoin.svg.png" alt="" width={32} height={32} />
          <p className="text-[16px] font-[400] leading-[19.2px] text-[#5C5C5C]">
            {tokenSymbol}
          </p>
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
