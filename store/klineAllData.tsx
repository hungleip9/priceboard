import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KLineData } from "klinecharts";

const initialState = {
  value: {} as Record<string, KLineData[]>,
  title: "All data chart",
};
interface Payload {
  symbol: string;
  value: KLineData[];
}
const klineAllData = createSlice({
  name: "klineAllData",
  initialState,
  reducers: {
    setKlineAllData: (state, action: PayloadAction<Payload>) => {
      const { symbol, value } = action.payload;
      state.value[symbol] = value;
    },
    resetKlineAllData: (state) => {
      state.value = {};
    },
  },
});

export const { setKlineAllData, resetKlineAllData } = klineAllData.actions;

export default klineAllData.reducer;
