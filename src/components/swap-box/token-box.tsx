import Image from "next/image";
import { type FC, useState } from "react";

type TokenBoxProps = {
  tokenSymbol: string;
  tokenAmount: number;
  accountBalance: number;
};

export const TokenBox: FC<TokenBoxProps> = ({
  tokenSymbol,
  tokenAmount,
  accountBalance,
}) => {
  const [inputValue, setInputValue] = useState(accountBalance);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="bg-[#FBF1F3] flex-col rounded-lg border py-4 px-6 space-y-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-1 items-center">
          <Image src="/Bitcoin.svg.png" alt="" width={32} height={32} />
          <p>{tokenSymbol}</p>
        </div>
        <span>{tokenAmount}</span>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-2 p-2 border rounded"
        />
      </div>
      <div>Balance: {accountBalance}</div>
    </div>
  );
};
