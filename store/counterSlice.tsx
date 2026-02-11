// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  title: "Counter App",
};

const counterSlice = createSlice({
  name: "counter", // tên slice (dùng trong action type)

  initialState,

  reducers: {
    // Các action và cách cập nhật state (tự động immutable nhờ Immer)
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      console.log("action.payload:", state, action);
      state.value += action.payload; // payload là dữ liệu gửi kèm
    },

    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export các action để dùng trong component
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// Export reducer để đưa vào store
export default counterSlice.reducer;
