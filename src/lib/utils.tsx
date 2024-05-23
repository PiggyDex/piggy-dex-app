import Big from "big.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertUnitToValue(
  balance: string | Big | bigint,
  decimals: number,
) {
  let temp;
  switch (typeof balance) {
    case "string":
      temp = Big(balance);
      break;
    case "bigint":
      temp = Big(balance.toString());
      break;
    default:
      temp = balance;
  }
  return temp.div(Big(10).pow(decimals)).toFixed();
}

export function convertValueToUnit(
  value: string | Big | bigint,
  decimals: number,
) {
  let temp;
  switch (typeof value) {
    case "string":
      temp = Big(value);
      break;
    case "bigint":
      temp = Big(value.toString());
      break;
    default:
      temp = value;
  }
  return temp.times(Big(10).pow(decimals)).toFixed();
}

export function formatPercentage(percentage: string | Big | bigint) {
  let temp;
  switch (typeof percentage) {
    case "string":
      temp = Big(percentage);
      break;
    case "bigint":
      temp = Big(percentage.toString());
      break;
    default:
      temp = percentage;
  }
  return temp.times(100).toFixed(2);
}

export function calculatePercent(
  amount: string | Big,
  totalBeforeAdd: string | Big,
) {
  return Big(amount).div(Big(amount).add(totalBeforeAdd)).toFixed(2);
}

export function formatSplitDigit(num: string | Big, decimal?: number) {
  let temp;
  if (num instanceof Big) {
    temp = num.toFixed();
  } else {
    temp = num;
  }
  const intergerPart = temp.slice(0, temp.length - (decimal || 18)) || "0";
  const decimalPart = temp.slice(temp.length - (decimal || 18)).substring(0, 9);

  return `${intergerPart.replace(/(.)(?=(\d{3})+$)/g, "$1,")}.${decimalPart}`;
}
