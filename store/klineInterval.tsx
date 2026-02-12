import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: "1d",
  title: "kline interval",
};

const klineInterval = createSlice({
  name: "klineInterval",

  initialState,

  reducers: {
    setKlineInterval: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setKlineInterval } = klineInterval.actions;

export default klineInterval.reducer;
