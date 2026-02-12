import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KLineData } from "klinecharts";

const initialState = {
  value: {
    close: 0,
    high: 0,
    low: 0,
    open: 0,
    timestamp: 0,
    volume: 0,
  } as KLineData,
  title: "New data chart",
};

const klineData = createSlice({
  name: "klineData",
  initialState,
  reducers: {
    setKlineData: (state, action: PayloadAction<KLineData>) => {
      state.value = { ...action.payload };
    },
    resetKlineData: (state) => {
      state.value = {
        close: 0,
        high: 0,
        low: 0,
        open: 0,
        timestamp: 0,
        volume: 0,
      };
    },
  },
});

export const { setKlineData, resetKlineData } = klineData.actions;

export default klineData.reducer;
