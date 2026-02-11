// store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectSymbolReducer from "./selectSymbol";

export const store = configureStore({
  reducer: {
    symbol: selectSymbolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
