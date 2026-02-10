import { _formatNumber } from "@/lib/global";
import "./OrderBook.scss";
interface Props {
  symbol: string;
}
export default function OrderBook({ symbol }: Props) {
  return (
    <div className="order-book">
      <div className="title">
        <h3>OrderBook</h3>
      </div>
      <div className="header-title">
        <p className="text-blur text-xs leading-4 mr-4 w-[80.72px]">
          Price (USD)
        </p>
        <p className="text-blur text-xs leading-4 mr-4 w-[80.74px]">
          Amount ({symbol})
        </p>
        <p className="text-blur text-xs leading-4 text-right">Total</p>
      </div>
      <div className="box-sell">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="row-sell relative">
            <p className="text-red text-sm leading-5 w-[75.66px] mr-4">
              {_formatNumber(65512.15)}
            </p>
            <p className="text text-sm leading-5 w-[75.66px] mr-4 text-right">
              1.821649
            </p>
            <p className="text-blur text-sm leading-5 w-[75.68px] text-right">
              119340.16
            </p>
            <span
              className={`absolute top-0 right-0 h-full bg-red`}
              style={{ width: "90%" }}
            ></span>
          </div>
        ))}
      </div>
      <div className="price-box">
        <h4 className="leading-6">{_formatNumber(65422.15)}</h4>
      </div>
      <div className="box-buy mb-3.5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="row-buy relative">
            <p className="text-green text-sm leading-5 w-[75.66px] mr-4">
              {_formatNumber(65512.15)}
            </p>
            <p className="text text-sm leading-5 w-[75.66px] mr-4 text-right">
              1.821649
            </p>
            <p className="text-blur text-sm leading-5 w-[75.68px] text-right">
              119340.16
            </p>
            <span
              className={`absolute top-0 right-0 h-full bg-green`}
              style={{ width: "90%" }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
}
