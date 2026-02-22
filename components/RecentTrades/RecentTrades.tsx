import {
  _createId,
  _formatNumber,
  _getFormatTime,
  _getRealNameForSymbol,
} from "@/lib/global";
import "./RecentTrades.scss";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
export default function RecentTrades() {
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const dataTradeStore = useSelector(
    (state: RootState) => state.dataTrade.value,
  );
  return (
    <div className="recent-trades flex flex-col">
      <div className="title">
        <h3>Recent Trades</h3>
      </div>
      <div className="header-title">
        <p className="text-blur text-xs leading-4 mr-4 w-[101.9px] text-center">
          Price (USD)
        </p>
        <p className="text-blur text-xs leading-4 mr-4 w-[96.47px] text-center">
          Amount ({_getRealNameForSymbol(symbolStore)})
        </p>
        <p className="text-blur text-xs leading-4 text-center w-[84.62px]">
          Time
        </p>
      </div>
      <div className="overflow-auto flex-1">
        {dataTradeStore.map((item) => {
          const colorClass = item.sell ? "text-red" : "text-green";
          return (
            <div key={_createId()} className="row-item">
              <p
                className={`${colorClass} text-base leading-6 w-[101.9px] text-center`}
              >
                {_formatNumber(item.price)}
              </p>
              <p className="text text-base leading-6 w-[101.9px] text-center">
                {_formatNumber(item.amount, 5)}
              </p>
              <p className="text-blur text-base leading-5 w-[84.65px] text-center">
                {_getFormatTime(item.time, {
                  getOnlyTime: true,
                  second: true,
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
