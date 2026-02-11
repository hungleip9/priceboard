// store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectSymbolReducer from "./selectSymbol";
import dataTickerReducer from "./dataTicker";
import dataTradeReducer from "./dataTrade";
import dataDepthReducer from "./dataDepth";

export const store = configureStore({
  reducer: {
    symbol: selectSymbolReducer,
    dataTicker: dataTickerReducer,
    dataTrade: dataTradeReducer,
    dataDepth: dataDepthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
