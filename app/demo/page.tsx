"use client";
import Button from "@/components/Button/Buttom";
import { useReducer, lazy, Suspense, useCallback } from "react";

export default function Demo() {
  const isAdmin = true;
  const SearchBox = lazy(() => import("@/components/SearchBox/SearchBox"));
  const reducer = (state: number, action: string) => {
    switch (action) {
      case "Tang":
        return state + 1;
      case "Giam":
        return state - 1;
      default:
        return 0;
    }
  };
  const SuspenseDiv = useCallback(() => {
    return (
      <>
        <Suspense fallback={<div className="text">Đang tải...</div>}>
          {isAdmin && <SearchBox />}
        </Suspense>
      </>
    );
  }, [isAdmin]);
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <p className="text">{count}</p>
      <Button onClick={() => dispatch("Tang")}>Tăng</Button>
      <Button onClick={() => dispatch("Giam")}>Giảm</Button>
      <Button onClick={() => dispatch("Xoa")}>Xóa tất cả</Button>
      {SuspenseDiv()}
    </div>
  );
}
