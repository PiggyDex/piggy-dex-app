import { ConnectButton } from "@rainbow-me/rainbowkit";

import { SwapBox } from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between overflow-x-hidden">
      <SwapBox />
      <ConnectButton />
    </main>
  );
}
