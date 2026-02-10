import { _formatNumber } from "@/lib/global";
import "./RecentTrades.scss";
interface Props {
  symbol: string;
}
export default function RecentTrades({ symbol }: Props) {
  return (
    <div className="recent-trades">
      <div className="title">
        <h3>Recent Trades</h3>
      </div>
      <div className="header-title">
        <p className="text-blur text-xs leading-4 mr-4 w-[101.9px] text-center">
          Price (USD)
        </p>
        <p className="text-blur text-xs leading-4 mr-4 w-[96.47px] text-center">
          Amount ({symbol})
        </p>
        <p className="text-blur text-xs leading-4 text-center w-[84.62px]">
          Time
        </p>
      </div>
      <div>
        {Array.from({ length: 14 }).map((_, index) => (
          <div key={index} className="row-item">
            <p className="text-green text-base leading-6 w-[101.9px] text-center">
              {_formatNumber(65453.72)}
            </p>
            <p className="text text-base leading-6 w-[101.9px] text-center">
              0.091540
            </p>
            <p className="text-blur text-base leading-5 w-[84.65px] text-center">
              10:06:39
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
