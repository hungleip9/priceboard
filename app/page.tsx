"use client";
import { useBinanceSocket } from "@/hooks/useBinanceSocket";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const { price } = useBinanceSocket({ symbol: "btcusdt" });
  const [close, setClose] = useState(0);
  const getClass = (close: number) => {
    if (close > 10) return "text-green";
    return "text-red";
  };

  return (
    <>
      <button onClick={() => setClose(close + 1)}>setClose</button>
      <div key={price} className={getClass(close)}>
        {price}
      </div>
    </>
  );
}
