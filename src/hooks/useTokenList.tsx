import { type TokenInterface } from "@/types";

const mainnetTokenList: TokenInterface[] = [
  {
    symbol: "CFX",
    name: "Conflux",
    decimals: 18,
    address: "0x0000000000000000000000000000000000000000",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b.png",
  },
  {
    symbol: "WCFX",
    name: "Wrapped Conflux",
    decimals: 18,
    address: "0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    address: "0xa47f43de2f9623acb395ca4905746496d2014d57",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0xa47f43de2f9623acb395ca4905746496d2014d57.png",
  },
  {
    symbol: "USDT",
    name: "Tether",
    decimals: 18,
    address: "0xfe97e85d13abd9c1c33384e796f10b73905637ce",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0xfe97e85d13abd9c1c33384e796f10b73905637ce.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 18,
    address: "0x6963efed0ab40f6c3d7bda44a05dcf1437c44372",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x6963efed0ab40f6c3d7bda44a05dcf1437c44372.png",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 18,
    address: "0x1f545487c62e5acfea45dcadd9c627361d1616d8",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x6963efed0ab40f6c3d7bda44a05dcf1437c44372.png",
  },
  {
    symbol: "xCFX",
    name: "X Nucleon CFX",
    decimals: 18,
    address: "0x889138644274a7dc602f25a7e7d53ff40e6d0091",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x889138644274a7dc602f25a7e7d53ff40e6d0091.png",
  },
];

const testnetTokenList: TokenInterface[] = [
  {
    symbol: "CFX",
    name: "Conflux",
    decimals: 18,
    address: "0x0000000000000000000000000000000000000000",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b.png",
  },
  {
    symbol: "WCFX",
    name: "Wrapped Conflux",
    decimals: 18,
    address: "0x2ed3dddae5b2f321af0806181fbfa6d049be47d8",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    address: "0xcd71270f82f319e0498ff98af8269c3f0d547c65",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0xa47f43de2f9623acb395ca4905746496d2014d57.png",
  },
  {
    symbol: "USDT",
    name: "Tether",
    decimals: 18,
    address: "0x7d682e65efc5c13bf4e394b8f376c48e6bae0355",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0xfe97e85d13abd9c1c33384e796f10b73905637ce.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 18,
    address: "0x349298b0e20df67defd6efb8f3170cf4a32722ef",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x6963efed0ab40f6c3d7bda44a05dcf1437c44372.png",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 18,
    address: "0x54593e02c39aeff52b166bd036797d2b1478de8d",
    logoURI: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    symbol: "xCFX",
    name: "X Nucleon CFX",
    decimals: 18,
    address: "0x092690013ef7af87eaf45030906baa86b8faa411",
    logoURI:
      "https://scanglobal.oss-cn-hongkong.aliyuncs.com/mainnet/0x889138644274a7dc602f25a7e7d53ff40e6d0091.png",
  },
];

export const useTokenList = (chainId: number) => {
  if (chainId === 1030) {
    return { tokenList: mainnetTokenList };
  }
  return { tokenList: testnetTokenList };
};

export const useWrappedCFX = (chainId: number) => {
  const { tokenList } = useTokenList(chainId);

  const WCFX = tokenList.filter((token) => {
    return token.symbol === "WCFX";
  });

  return { WCFX: WCFX[0] };
};
