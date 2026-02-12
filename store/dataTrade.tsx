import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataTrade {
  price: string;
  amount: string;
  time: number;
  sell: boolean;
}
const initialState = {
  value: [] as DataTrade[],
  title: "Data Ticker",
};

const dataTrade = createSlice({
  name: "dataTrade",
  initialState,
  reducers: {
    setDataTrade: (state, action: PayloadAction<DataTrade>) => {
      const item = action.payload;
      state.value = [item, ...state.value].slice(0, 50);
    },
    resetDataTrade: (state) => {
      state.value = [];
    },
  },
});

export const { setDataTrade, resetDataTrade } = dataTrade.actions;

export default dataTrade.reducer;
