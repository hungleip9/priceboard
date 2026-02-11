// types/binance.ts
export interface TradeData {
  e: string; // string: Event type = "trade"
  E: number; // integer: Event time (ms)
  s: string; // string: Symbol
  t: number; // integer: Trade ID (định danh duy nhất của giao dịch)
  p: string; // string: Price (giá)
  q: string; // string: Quantity (khối lượng)
  b: number; // integer: Buyer order ID (mã lệnh mua)
  a: number; // integer: Seller order ID (mã lệnh bán)
  T: number; // integer: Trade time (thời gian giao dịch, ms)
  m: boolean; // boolean: Is the buyer the market maker? (true = active sell, false = active buy)
  M: boolean // boolean: Ignore (bỏ qua)
}
export interface Ticker24hr {
  e: string; // Event type: "24hrTicker"
  E: number; // Event time (timestamp)
  s: string; // Symbol
  p: string; // Price change
  P: string; // Price change percent
  w: string; // Weighted average price
  x: string; // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: string; // Last price
  Q: string; // Last quantity
  b: string; // Best bid price
  B: string; // Best bid quantity
  a: string; // Best ask price
  A: string; // Best ask quantity
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

export interface DepthData {
  E: number; // Event time
  U: number; // First update ID in event
  a: string[][]; // Asks to be updated
  b: string[][]; // Bids to be updated
  e: string; // Event type
  s: string; // Symbol
  u: number; // Last update ID in event
}