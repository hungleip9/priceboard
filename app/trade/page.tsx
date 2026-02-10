import Markets from "@/components/Markets/Markets";
import BuySell from "@/components/BuySell/BuySell";
import BaseIcon from "@/components/BaseIcon";
import "./Trade.scss";
import OrderBook from "@/components/OrderBook/OrderBook";
import RecentTrades from "@/components/RecentTrades/RecentTrades";
export default function page() {
  return (
    <div className="w-full h-[1277px] flex flex-row trade-page">
      <Markets />
      <div className="w-[618px] mr-[16.4px]">
        <div className="flex flex-row items-center mb-4">
          <div className="info-market-box mr-3">
            <p className="text-blur text-xs leading-5 mb-1">Market Cap</p>
            <h2 className="mb-2">$1.23T</h2>
            <div className="text-green flex flex-row items-center">
              <BaseIcon width={12} height={12} name="arr-up" />
              <span className="text-sm">2.10%</span>
            </div>
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
            <div className="text-green flex flex-row items-center">
              <BaseIcon width={12} height={12} name="arr-up" />
              <span className="text-sm">0.58%</span>
            </div>
          </div>
        </div>
        <div className="price-chart text">Price chart</div>
        <div className="flex flex-row items-center">
          <div className="mr-4 w-[300px]">
            <OrderBook symbol="BTC" />
          </div>
          <div className="w-[299px]">
            <RecentTrades symbol="BTC" />
          </div>
        </div>
      </div>
      <BuySell />
    </div>
  );
}
