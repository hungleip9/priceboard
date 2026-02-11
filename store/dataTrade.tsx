import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataTrade {
  id: string;
  price: string;
  amount: string;
  time: number;
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
      const newArray = [item, ...state.value].slice(0, 100);
      state.value = [...newArray];
    },
  },
});

export const { setDataTrade } = dataTrade.actions;

export default dataTrade.reducer;
