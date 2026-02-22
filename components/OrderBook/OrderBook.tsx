import { _createId, _formatNumber, _getRealNameForSymbol } from "@/lib/global";
import "./OrderBook.scss";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function OrderBook() {
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const dataDepthStore = useSelector(
    (state: RootState) => state.dataDepth.value,
  );
  const dataTickerStore = useSelector(
    (state: RootState) => state.dataTicker.value,
  );

  const boxSellBuyRow = (item: string[], type = "row-sell") => {
    return (
      <div key={_createId()} className={`${type} relative`}>
        <p className="text-red text-sm leading-5 w-[75.66px] mr-4">
          {_formatNumber(item[0], 2)}
        </p>
        <p className="text text-sm leading-5 w-[75.66px] mr-4 text-right">
          {_formatNumber(item[1], 6)}
        </p>
        <p className="text-blur text-sm leading-5 w-[75.68px] text-right">
          {_formatNumber(item[2], 2)}
        </p>
        <span
          className={`absolute top-0 right-0 h-full bg-red`}
          style={{ width: item[3] }}
        ></span>
      </div>
    );
  };
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
        {dataDepthStore.asks.map((item) => boxSellBuyRow(item))}
      </div>
      <div className="price-box">
        <h4 className="leading-6">
          {_formatNumber(dataTickerStore[symbolStore]?.close)}
        </h4>
      </div>
      <div className="box-buy mb-3.5">
        {dataDepthStore.bids.map((item) => boxSellBuyRow(item, "row-buy"))}
      </div>
    </div>
  );
}
