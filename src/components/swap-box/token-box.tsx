import { InputNumber, type InputNumberProps } from "antd";
import Image from "next/image";
import { type FC } from "react";

import { convertUnitToValue } from "@/lib";
import { type TokenInterface } from "@/types";

export type TokenBoxProps = {
  tokens: TokenInterface[];
  tokensAmount: string[];
  accountBalances: string[];
  handleInputChange?: InputNumberProps["onChange"][];
  showModal: (() => void)[];
};

export const TokenBox: FC<TokenBoxProps> = ({
  tokens,
  tokensAmount,
  accountBalances,
  handleInputChange,
  showModal,
}) => {
  return (
    <div className="flex flex-col items-start gap-3 self-stretch rounded-[10px] border border-solid border-[#E1A1B1] bg-[#FBF1F3] px-6 py-4">
      <div className="flex w-full items-center self-stretch">
        <div className="flex items-center gap-1">
          <Image src={`${tokens[0].logoURI}`} alt="" width={32} height={32} />
          <div className="text-[16px] font-[400] leading-[19.2px] text-[#5C5C5C]">
            {tokens[0].symbol}
          </div>
          <Image
            src="/swap-more.svg"
            alt=""
            width={24}
            height={24}
            className="hover:cursor-pointer"
            onClick={showModal[0]}
          />
        </div>
        <InputNumber
          value={tokensAmount[0]}
          onChange={handleInputChange ? handleInputChange[0] : undefined}
          className="w-auto flex-[1_1_0%] items-end justify-center rounded border !border-transparent !bg-transparent p-2 text-[16px] font-[400] leading-[19.2px] text-[#5C5C5C] [&_.ant-input-number-input]:text-right"
          inputMode="numeric"
          controls={false}
          variant="borderless"
          step="0.000000001"
          precision={9}
          max={convertUnitToValue(accountBalances[0], tokens[0].decimals)}
          stringMode
          disabled={!handleInputChange}
        />
      </div>
      <div className="text-[16px] font-[400] leading-[19.2px] text-[#5C5C5C]">
        Balance:{" "}
        {convertUnitToValue(accountBalances[0], tokens[0].decimals).slice(0, 9)}
      </div>
    </div>
  );
};
