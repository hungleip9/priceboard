// src/features/counter/counterSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: "btcusdt",
  title: "Select Symbol",
};

const selectSymbol = createSlice({
  name: "symbol", // tên slice (dùng trong action type)

  initialState,

  reducers: {
    // Các action và cách cập nhật state (tự động immutable nhờ Immer)
    setSymbol: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Export các action để dùng trong component
export const { setSymbol } = selectSymbol.actions;

// Export reducer để đưa vào store
export default selectSymbol.reducer;
