import { _formatNumber, _getRealNameForSymbol } from "@/lib/global";
import "./OrderBook.scss";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import useBinanceSocket from "@/hooks/useBinanceSocket";
import VirtualList from "@rc-component/virtual-list";
export default function OrderBook() {
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const { dataDepth } = useBinanceSocket({
    symbol: symbolStore,
    streamType: "depth",
  });
  console.log("dataDepth: ", dataDepth);
  return (
    <div className="order-book">
      <div className="title">
        <h3>Order Book</h3>
      </div>
      <div className="header-title">
        <p className="text-blur text-xs leading-4 mr-4 w-[80.72px]">
          Price (USD)
        </p>
        <p className="text-blur text-xs leading-4 mr-4 w-[80.74px]">
          Amount ({_getRealNameForSymbol(symbolStore)})
        </p>
        <p className="text-blur text-xs leading-4 text-right">Total</p>
      </div>
      <div className="box-sell">
        <VirtualList
          data={dataDepth.asks}
          height={220}
          itemHeight={24}
          itemKey="id"
        >
          {(item: string[]) => (
            <div key={item[3]} className="row-sell relative">
              <p className="text-red text-sm leading-5 w-[75.66px] mr-4">
                {_formatNumber(item[0], {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text text-sm leading-5 w-[75.66px] mr-4 text-right">
                {_formatNumber(item[1], {
                  minimumFractionDigits: 6,
                  maximumFractionDigits: 6,
                })}
              </p>
              <p className="text-blur text-sm leading-5 w-[75.68px] text-right">
                {_formatNumber(item[2], {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <span
                className={`absolute top-0 right-0 h-full bg-red`}
                style={{ width: item[4] }}
              ></span>
            </div>
          )}
        </VirtualList>
      </div>
      <div className="price-box">
        <h4 className="leading-6">{_formatNumber(65422.15)}</h4>
      </div>
      <div className="box-buy mb-3.5">
        <VirtualList
          data={dataDepth.bids}
          height={220}
          itemHeight={24}
          itemKey="id"
        >
          {(item: string[]) => (
            <div key={item[3]} className="row-buy relative">
              <p className="text-green text-sm leading-5 w-[75.66px] mr-4">
                {_formatNumber(item[0], {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text text-sm leading-5 w-[75.66px] mr-4 text-right">
                {_formatNumber(item[1], {
                  minimumFractionDigits: 6,
                  maximumFractionDigits: 6,
                })}
              </p>
              <p className="text-blur text-sm leading-5 w-[75.68px] text-right">
                {_formatNumber(item[2], {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <span
                className={`absolute top-0 right-0 h-full bg-green`}
                style={{ width: item[4] }}
              ></span>
            </div>
          )}
        </VirtualList>
      </div>
    </div>
  );
}
