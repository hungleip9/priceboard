import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataDepth {
  asks: string[][];
  bids: string[][];
}
const initialState = {
  value: { asks: [], bids: [] } as DataDepth,
  title: "Data Ticker",
};

const dataDepth = createSlice({
  name: "dataDepth",
  initialState,
  reducers: {
    setDataDepth: (state, action: PayloadAction<DataDepth>) => {
      state.value = { ...action.payload };
    },
  },
});

export const { setDataDepth } = dataDepth.actions;

export default dataDepth.reducer;
