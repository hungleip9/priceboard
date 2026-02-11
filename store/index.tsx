// store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
// import infoUserReducer from "./infoUserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // infoUser: infoUserReducer,
  },
});

// Infer types (rất hữu ích khi dùng TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
