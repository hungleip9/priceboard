export interface AggTrade {
  "e": string;  // Event type
  "E": number;   // Event time
  "s": string;   // Symbol
  "a": number;		  // Aggregate trade ID
  "p": string;     // Price
  "q": string;       // Quantity with all the market trades
  "nq": string;      // Normal quantity without the trades involving RPI orders
  "f": number;         // First trade ID
  "l": number;         // Last trade ID
  "T": number;   // Trade time
  "m": boolean;        // Is the buyer the market maker?
}
export interface KlineMess {
  "e": string;     // Event type
  "E": number;   // Event time
  "s": string;    // Symbol
  "k": {
    "t": number; // Kline start time
    "T": number; // Kline close time
    "s": string;  // Symbol
    "i": string;      // Interval
    "f": number;       // First trade ID
    "L": number;       // Last trade ID
    "o": string;  // Open price
    "c": string;  // Close price
    "h": string;  // High price
    "l": string;  // Low price
    "v": string;    // Base asset volume
    "n": number;       // Number of trades
    "x": boolean,     // Is this kline closed?
    "q": string;  // Quote asset volume
    "V": string;     // Taker buy base asset volume
    "Q": string;   // Taker buy quote asset volume
    "B": string;   // Ignore
  }
}
export interface MiniTicker {
  "e": string; // Event type
  "E": number; // Event time
  "s": string; // Symbol
  "c": string; // Close price
  "o": string; // Open price
  "h": string; // High price
  "l": string; // Low price
  "v": string; // Total traded base asset volume
  "q": string; // Total traded quote asset volume
}