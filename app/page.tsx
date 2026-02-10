"use client";
import { useBinanceSocket } from "@/hooks/useBinanceSocket";

export default function Home() {
  const { price } = useBinanceSocket({ symbol: "btcusdt" });

  return (
    <>
      <div key={price} className="text-red">
        {price}
      </div>
    </>
  );
}
