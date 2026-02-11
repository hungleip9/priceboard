import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataTicker {
  close: string;
  open: string;
  hight: string;
  low: string;
  time: number;
  volumn: string;
  change: string;
}
interface Payload {
  symbol: string;
  value: DataTicker;
}
const initialState = {
  value: {} as Record<string, DataTicker>,
  title: "Data Ticker",
};

const dataTicker = createSlice({
  name: "dataTicker",
  initialState,
  reducers: {
    setDataTicker: (state, action: PayloadAction<Payload>) => {
      const { symbol, value } = action.payload;
      state.value[symbol] = value;
    },
  },
});

export const { setDataTicker } = dataTicker.actions;

export default dataTicker.reducer;
