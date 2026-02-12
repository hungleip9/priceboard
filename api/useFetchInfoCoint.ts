import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  symbol: string;
}
interface Info {
  "symbol": string;
  "sumOpenInterest": string;
  "sumOpenInterestValue": string;
  "CMCCirculatingSupply": string;
  "timestamp": number
}
export default function useFetchInfoCoint({ symbol }: Props) {
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API}/futures/data/openInterestHist`);
        url.searchParams.set('symbol', symbol.toUpperCase());
        url.searchParams.set('period', '1d');
        url.searchParams.set('limit', '1');

        const response = await fetch(url);
        const res = await response.json();
        setInfo(res[0])
        setError(null);
      } catch (err) {
        setInfo(null)
        setError(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [symbol]);

  return { isLoading, error, info };
}
