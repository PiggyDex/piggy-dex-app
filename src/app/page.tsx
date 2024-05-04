import { SwapBox } from "@/components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between overflow-x-hidden">
      <SwapBox />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <div>
          <ConnectButton />
        </div>
      </div>
    </main>
  );
}
