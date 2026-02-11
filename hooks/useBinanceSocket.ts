// hooks/useBinanceSocket.ts
import { useState, useEffect, useRef } from 'react';
import { Ticker24hr, TradeData } from '@/types/binance';
import { _createId } from '@/lib/global';

interface UseBinanceSocketProps {
  symbol?: string
  streamType?: 'trade' | 'kline' | 'depth' | 'ticker';
}
interface DataTicker {
  close: string,
  open: string,
  hight: string,
  low: string,
  time: number,
  volumn: string,
  change: string,
}
interface DataTrade {
  id: string;
  price: string;
  amount: string;
  time: number;
}
interface DataDepth {
  asks: string[][]
  bids: string[][]
}
const useBinanceSocket = ({
  symbol = '',
  streamType = "ticker"
}: UseBinanceSocketProps) => {
  let symbolCheck = ''
  const [dataTrade, setDataTrade] = useState<DataTrade[]>([]);
  const [dataTicker, setDataTicker] = useState<Record<string, DataTicker>>({});
  const [dataDepth, setDataDepth] = useState<DataDepth>({ asks: [], bids: [] });
  const wsRef = useRef<WebSocket | null>(null);
  const symbols = ["btcusdt", "ethusdt", "bnbusdt", "solusdt", "adausdt", "xrpusdt"]
  useEffect(() => {
    // Created WebSocket connection
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_API}`);
    wsRef.current = ws;
    ws.onopen = () => {
      console.log('✅ WebSocket connected (Singleton)');
      // Created streams
      let id = ''
      let streams = [] as string[]
      if (streamType === 'ticker') {
        id = `socket-ticker-${streamType}`
        streams = symbols.map(s =>
          `${s.toLowerCase()}@${streamType}`
        );
      } else if (streamType === 'depth' && symbol) {
        id = `socket-depth-${streamType}`
        streams = [`${symbol.toLowerCase()}@${streamType}`]
      } else if (streamType === 'trade' && symbol) {
        id = `socket-trade-${streamType}`
        streams = [`${symbol.toLowerCase()}@${streamType}`]
      }
      // Subscribe
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: streams,
        id: id
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const typeMess = message.e || ''
        if (!message.s || !['24hrTicker', 'trade', 'depthUpdate'].includes(typeMess)) return
        const nameSymbol = message.s.toLowerCase() || ''
        if (message.e === '24hrTicker') {
          // ticker
          const newData = {
            close: message.c,
            open: message.o,
            hight: message.h,
            low: message.l,
            time: message.E,
            volumn: message.q,
            change: message.P,
          }
          setDataTicker(prev => ({ ...prev, [nameSymbol]: newData }));
        } else if (message.e === "trade") {
          // trade
          if (symbolCheck !== nameSymbol) {
            symbolCheck = nameSymbol
            setDataTrade([]);
            return
          }
          const newTrade = {
            id: _createId(),
            price: message.p,
            amount: message.q,
            time: message.T
          }
          setDataTrade(prev => ([newTrade, ...prev]));
        } else if (message.e === "depthUpdate") {
          // depth
          if (symbolCheck !== nameSymbol) {
            symbolCheck = nameSymbol
            setDataDepth({ asks: [], bids: [] });
            return
          }
          const id = message.u
          const arrAsks = message.a || []
          const arrBids = message.b || []
          const totalAsksQuantity = arrAsks.reduce((sum: number, bid: string[]) => {
            return sum + Number(bid[1]);
          }, 0);
          const totalBidsQuantity = arrBids.reduce((sum: number, bid: string[]) => {
            return sum + Number(bid[1]);
          }, 0);
          const asks = arrAsks.map((e: string, index: number) => {
            const tottal = Number(e[0]) + Number(e[1]) || ''
            const percent = Math.round(((Number(e[1]) * 100) / totalAsksQuantity) * 2) || 0;
            return [...e, `${tottal}`, `asks-${id}-${index}`, `${percent}%`]
          })
          const bids = arrBids.map((e: string, index: number) => {
            const tottal = Number(e[0]) + Number(e[1]) || ''
            const percent = Math.round(((Number(e[1]) * 100) / totalBidsQuantity) * 2) || 0;
            return [...e, `${tottal}`, `bids-${id}-${index}`, `${percent}%`]
          })
          const newData = {
            asks: asks || [],
            bids: bids || [],
          }
          setDataDepth(newData)
        }
      } catch (error) {
        console.error('Parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [streamType]);
  return { dataTicker, dataTrade, dataDepth };
};

export default useBinanceSocket;