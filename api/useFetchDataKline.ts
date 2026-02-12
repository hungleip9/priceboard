import { useEffect, useState } from "react";

import { setKlineAllData } from "@/store/klineAllData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {
  symbol: string;
  interval: string;
  limit: number
}
export default function useFetchDataKline({ symbol, interval, limit }: Props) {
  const dispatch = useDispatch();
  const dataStore = useSelector((state: RootState) => state.klineAllData.value);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapData = (res: unknown[][] = []) => {
    if (!res.length) {
      dispatch(setKlineAllData({ symbol: `${symbol}-${interval}`, value: [] }));
      return
    }
    const arr = res.map((item: unknown[]) => {
      return {
        close: Number(item[4]) || 0,
        high: Number(item[2]) || 0,
        low: Number(item[3]) || 0,
        open: Number(item[1]) || 0,
        timestamp: Number(item[0]),
        volume: Number(item[0]) || 0,
      }
    })
    dispatch(setKlineAllData({ symbol: `${symbol}-${interval}`, value: arr }));
  }
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (dataStore && dataStore[`${symbol}-${interval}`]?.length) {
        setIsLoading(false);
      }
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API}/fapi/v1/klines`);
        url.searchParams.set('symbol', symbol.toUpperCase());
        url.searchParams.set('interval', interval);
        url.searchParams.set('limit', String(limit));

        const response = await fetch(url);
        const res = await response.json();
        mapData(res)
        setError(null);
      } catch (err) {
        dispatch(setKlineAllData({ symbol: `${symbol}-${interval}`, value: [] }));
        setError(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [symbol, interval, limit]);

  return { isLoading, error };
}
