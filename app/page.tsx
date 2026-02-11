"use client";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "@/store/counterSlice";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button className="block border" onClick={() => dispatch(increment())}>
        Tăng
      </button>
      <button className="block border" onClick={() => dispatch(decrement())}>
        Giảm
      </button>
      <button
        className="block border"
        onClick={() => dispatch(incrementByAmount(5))}
      >
        IncrementByAmount
      </button>
      <button className="block border" onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}
