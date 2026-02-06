"use client";
import { useBinanceSocket } from "@/hooks/useBinanceSocket";
export default function Home() {
  const { price, isConnected } = useBinanceSocket({ symbol: "btcusdt" });
  return (
    <>
      {isConnected}
      <div>{price}</div>
    </>
  );
}
