// hooks/useBinanceSocket.ts
import { useState, useEffect, useRef } from 'react';
import { Ticker24hr } from '@/types/binance';

interface UseBinanceSocketProps {
  streamType?: string;
}
interface Data {
  close: string,
  open: string,
  hight: string,
  low: string,
  time: number,
  volumn: string,
  change: string,
}
const useBinanceSocket = ({
  streamType = "ticker"
}: UseBinanceSocketProps) => {
  const [data, setData] = useState<Record<string, Data>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const symbols = ["btcusdt", "ethusdt", "bnbusdt", "solusdt", "adausdt", "xrpusdt"]
  useEffect(() => {
    // Created WebSocket connection
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_API}`);
    wsRef.current = ws;

    ws.onopen = () => {
      // Created streams từ symbols
      const streams = symbols.map(s =>
        `${s.toLowerCase()}@${streamType}`
      );
      // Subscribe
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: streams,
        id: 1
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as Ticker24hr;

        if (message.e === '24hrTicker' && message.s) {
          const nameSymbol = message.s.toLowerCase() || ''
          if (!nameSymbol) return
          const newData = {
            close: message.c,
            open: message.o,
            hight: message.h,
            low: message.l,
            time: message.E,
            volumn: message.q,
            change: message.P,
          }
          setData(prev => ({ ...prev, [nameSymbol]: newData }));
        }
      } catch (error) {
        console.error('Parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbols.join(','), streamType]);
  return { dataTicker: data };
};

export default useBinanceSocket;