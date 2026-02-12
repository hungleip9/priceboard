// hooks/useBinanceSocket.ts
import { useEffect, useRef } from 'react';
import { _createId } from '@/lib/global';
// store
import { setDataTicker, resetDataTicker } from "@/store/dataTicker";
import { setDataTrade, resetDataTrade } from "@/store/dataTrade";
import { setDataDepth, resetDataDepth } from "@/store/dataDepth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
const useBinanceSocket = () => {
  // store
  const dispatch = useDispatch();
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const wsRef = useRef<WebSocket | null>(null);
  const symbols = ["btcusdt", "ethusdt", "bnbusdt", "solusdt", "adausdt", "xrpusdt"]
  const connect = (symbolDrop: string) => {
    // close old connect.
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    // Created WebSocket connection
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_API}`);
    wsRef.current = ws;
    ws.onopen = () => {
      console.log('✅ WebSocket connected (Singleton)');
      // Created streams
      const streams = [] as string[]
      symbols.forEach(s => {
        streams.push(`${s.toLowerCase()}@ticker`)
      });
      streams.push(`${symbolDrop.toLowerCase()}@depth`)
      streams.push(`${symbolDrop.toLowerCase()}@trade`)
      // Subscribe
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: streams,
        id: 1
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
          dispatch(setDataTicker({ symbol: nameSymbol, value: newData }))
          return
        }
        if (nameSymbol !== symbolDrop) return
        if (message.e === "trade") {
          if (Number(message.q) === 0) return
          const newTrade = {
            price: message.p,
            amount: message.q,
            time: message.T,
            sell: message.m
          }
          dispatch(setDataTrade(newTrade))
        } else if (message.e === "depthUpdate") {
          const arrAsks = message.a.filter((e: string[]) => Number(e[1]) > 0).reverse().slice(-8) || []
          const arrBids = message.b.filter((e: string[]) => Number(e[1]) > 0).slice(0, 8) || []
          const totalAsksQuantity = arrAsks.reduce((sum: number, ask: string[]) => {
            return sum + Number(ask[1]);
          }, 0);
          const totalBidsQuantity = arrBids.reduce((sum: number, bid: string[]) => {
            return sum + Number(bid[1]);
          }, 0);
          const asks = arrAsks
            .map((e: string[]) => {
              const price = Number(e[0]);
              const quantity = Number(e[1]);
              const total = (price * quantity).toFixed(2);
              const percent = Math.round(((quantity * 100) / totalAsksQuantity) * 2) || 0;

              return [e[0], e[1], total, `${percent}%`];
            });

          const bids = arrBids
            .map((e: string[]) => {
              const price = Number(e[0]);
              const quantity = Number(e[1]);
              const total = (price * quantity).toFixed(2);
              const percent = Math.round(((quantity * 100) / totalBidsQuantity) * 2) || 0;

              return [e[0], e[1], total, `${percent}%`];
            });
          const newData = {
            asks: asks || [],
            bids: bids || [],
          }
          dispatch(setDataDepth(newData))
        }
      } catch (error) {
        console.error('Parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };
  }
  useEffect(() => {
    dispatch(resetDataDepth())
    dispatch(resetDataTrade())
    dispatch(resetDataTicker())
    if (!symbolStore) return;
    connect(symbolStore)

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbolStore]);
};

export default useBinanceSocket;