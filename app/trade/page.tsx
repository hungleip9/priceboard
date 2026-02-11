"use client";
import BuySell from "@/components/BuySell/BuySell";
import BaseIcon from "@/components/BaseIcon";
import "./Trade.scss";
import Kline from "@/components/Kline/Kline";
import Radio from "@/components/Radio/Radio";
import ChangeBox from "@/components/ChangeBox/ChangeBox";
import dynamic from "next/dynamic";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import useBinanceSocket from "@/hooks/useBinanceSocket";

const RecentTrades = dynamic(
  () => import("@/components/RecentTrades/RecentTrades"),
  {
    ssr: false,
  },
);
const OrderBook = dynamic(() => import("@/components/OrderBook/OrderBook"), {
  ssr: false,
});
const Markets = dynamic(() => import("@/components/Markets/Markets"), {
  ssr: false,
});
export default function Page() {
  useBinanceSocket();
  const symbolStore = useSelector((state: RootState) => state.symbol.value);

  const onSelect = (val: string) => {
    console.log("val: ", val);
  };
  return (
    <div className="w-full h-[1277px] flex flex-row trade-page">
      <Markets />
      <div className="w-[618px] mr-[16.4px]">
        <div className="flex flex-row items-center mb-4">
          <div className="info-market-box mr-3">
            <p className="text-blur text-xs leading-5 mb-1">Market Cap</p>
            <h2 className="mb-2">$1.23T</h2>
            <div className="w-[60px]">{ChangeBox(2.1)}</div>
          </div>
          <div className="info-market-box mr-3">
            <p className="text-blur text-xs leading-5 mb-1">24h Volume</p>
            <h2 className="mb-2">$2.85B</h2>
          </div>
          <div className="info-market-box mr-3">
            <p className="text-blur text-xs leading-5 mb-1">Supply</p>
            <h2 className="mb-2">19.5M</h2>
          </div>
          <div className="info-market-box">
            <p className="text-blur text-xs leading-5 mb-1">Dominance</p>
            <h2 className="mb-2">52.4%</h2>
            <div className="w-[60px]">{ChangeBox(0.58)}</div>
          </div>
        </div>
        <div className="price-chart flex flex-col">
          <div className="controler-chart">
            <div className="flex flex-row items-center">
              <BaseIcon
                width={16}
                height={16}
                name="arr-brk-up"
                className="mr-2"
              />
              <h3 className="leading-[27px]">Price Chart</h3>
            </div>
            <div className="box-btn">
              <Radio onSelect={onSelect} />
            </div>
          </div>
          <div className="flex-1">
            <Kline />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-4 w-[300px]">
            <OrderBook key={`OrderBook-${symbolStore}`} />
          </div>
          <div className="w-[299px]">
            <RecentTrades key={`RecentTrades-${symbolStore}`} />
          </div>
        </div>
      </div>
      <BuySell />
    </div>
  );
}
