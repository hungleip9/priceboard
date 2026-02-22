"use client";
import BuySell from "@/components/BuySell/BuySell";
import BaseIcon from "@/components/BaseIcon";
import "./Trade.scss";
import Radio from "@/components/Radio/Radio";
import ChangeBox from "@/components/ChangeBox/ChangeBox";
import dynamic from "next/dynamic";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import useBinanceSocket from "@/hooks/useBinanceSocket";
import { setKlineInterval } from "@/store/klineInterval";
import { _formatNumber, _numberShortener } from "@/lib/global";
import fetchInfoCoint from "@/api/useFetchInfoCoint";
import { TVChartContainer } from "@/components/TVChartContainer";
import Kline from "@/components/Kline/Kline";
import { useState } from "react";

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
  const dispatch = useDispatch();
  useBinanceSocket();
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const dataTickerStore = useSelector(
    (state: RootState) => state.dataTicker.value,
  );
  const interValStore = useSelector(
    (state: RootState) => state.klineInterval.value,
  );
  const { info } = fetchInfoCoint({ symbol: symbolStore });
  const [showTradingview, setShowTradingview] = useState(false);

  const Chart = () => {
    if (showTradingview) {
      return (
        <>
          <TVChartContainer
            symbol={symbolStore}
            interval={interValStore}
            client_id={"tradingview_trade"}
            user_id={"pinetree_priceboard"}
          />
        </>
      );
    }
    return (
      <>
        <Kline interval={interValStore} symbol={symbolStore} />
      </>
    );
  };
  const getMartketCap = () => {
    if (!info || !dataTickerStore[symbolStore]) return "00.00";
    const total =
      Number(info.CMCCirculatingSupply) *
        Number(dataTickerStore[symbolStore].close) || 0;
    return _numberShortener(total, 2) || "00.00";
  };
  return (
    <div className="w-full flex flex-row trade-page">
      <Markets />
      <div className="w-[618px] mr-[16.4px]">
        <div className="flex flex-row items-center mb-4">
          <div className="info-market-box mr-3">
            <p className="text-blur text-sm leading-5 mb-1">Market Cap</p>
            <h2 className="mb-2 whitespace-nowrap">${getMartketCap()}</h2>
            <div className="w-[60px]">{ChangeBox(2.1)}</div>
          </div>
          <div className="info-market-box mr-3">
            <p className="text-blur text-sm leading-5 mb-1">24h Volume</p>
            <h2 className="mb-2 whitespace-nowrap">
              ${_numberShortener(dataTickerStore[symbolStore]?.volumn, 2)}
            </h2>
          </div>
          <div className="info-market-box mr-3">
            <p className="text-blur text-sm leading-5 mb-1">Supply</p>
            <h2 className="mb-2 whitespace-nowrap">
              {_numberShortener(info?.CMCCirculatingSupply, 2)}
            </h2>
          </div>
          <div className="info-market-box">
            <p className="text-blur text-sm leading-5 mb-1">Dominance</p>
            <h2 className="mb-2 whitespace-nowrap">52.4%</h2>
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
              <h3
                className="leading-[27px] cursor-pointer"
                onClick={() => {
                  setShowTradingview(!showTradingview);
                }}
              >
                Price Chart
              </h3>
            </div>
            <div className="box-btn">
              <Radio
                onSelect={(val: string) => {
                  dispatch(setKlineInterval(val));
                }}
              />
            </div>
          </div>
          <div className="w-[616px] h-[432px]">{Chart()}</div>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-4 w-[300px]">
            <OrderBook key={`OrderBook-${symbolStore}`} />
          </div>
          <div className="w-[300px]">
            <RecentTrades key={`RecentTrades-${symbolStore}`} />
          </div>
        </div>
      </div>
      <BuySell />
    </div>
  );
}
