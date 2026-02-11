import {
  _formatNumber,
  _getFormatTime,
  _getRealNameForSymbol,
} from "@/lib/global";
import "./RecentTrades.scss";
import VirtualList from "@rc-component/virtual-list";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
interface DataTrade {
  id: string;
  price: string;
  amount: string;
  time: number;
}
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
        <VirtualList
          data={dataTradeStore}
          height={510}
          itemHeight={32}
          itemKey="id"
        >
          {(item: DataTrade) => (
            <div key={item.id} className="row-item">
              <p className="text-green text-base leading-6 w-[101.9px] text-center">
                {_formatNumber(item.price)}
              </p>
              <p className="text text-base leading-6 w-[101.9px] text-center">
                {_formatNumber(item.amount, {
                  minimumFractionDigits: 5,
                  maximumFractionDigits: 5,
                })}
              </p>
              <p className="text-blur text-base leading-5 w-[84.65px] text-center">
                {_getFormatTime(item.time, {
                  getOnlyTime: true,
                  second: true,
                })}
              </p>
            </div>
          )}
        </VirtualList>
      </div>
    </div>
  );
}
