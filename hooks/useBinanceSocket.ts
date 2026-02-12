// hooks/useBinanceSocket.ts
import { useEffect, useRef } from 'react';
import { _createId } from '@/lib/global';
// store
import { setDataTicker, resetDataTicker } from "@/store/dataTicker";
import { setDataTrade, resetDataTrade } from "@/store/dataTrade";
import { setDataDepth, resetDataDepth } from "@/store/dataDepth";
import { setKlineData } from "@/store/klineData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { KLineData } from 'klinecharts';
import { AggTrade, KlineMess, MiniTicker } from '@/types/binance';
const useBinanceSocket = () => {
  // store
  const dispatch = useDispatch();
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const klineIntervalStore = useSelector((state: RootState) => state.klineInterval.value);
  const wsRef = useRef<WebSocket | null>(null);
  const symbols = ["btcusdt", "ethusdt", "bnbusdt", "solusdt", "adausdt", "xrpusdt"]
  const handleDepthUpdate = (depthData: { asks: string[][], bids: string[][] }) => {
    const arrAsks = depthData.asks.reverse() || []
    const arrBids = depthData.bids || []
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
  const handleAggTrade = (dataAggTrade: AggTrade) => {
    const newTrade = {
      price: dataAggTrade.p,
      amount: dataAggTrade.q,
      time: dataAggTrade.T,
      sell: dataAggTrade.m
    }
    dispatch(setDataTrade(newTrade))
  }
  const handleUpdateKline = (mess: KlineMess) => {
    const data = mess.k
    const newline = {
      open: Number(data.o) || 0,
      close: Number(data.c) || 0,
      high: Number(data.h) || 0,
      low: Number(data.l) || 0,
      timestamp: Number(data.t),
      volume: Number(data.v) || 0
    } as KLineData
    dispatch(setKlineData(newline))
  }
  const handleUpdateMiniTicker = (message: MiniTicker) => {
    const nameSymbol = message.s.toLowerCase() || ''
    const change = parseFloat(message.c) - parseFloat(message.o);
    const changePercent = (change / parseFloat(message.o)) * 100;
    const newData = {
      close: message.c,
      open: message.o,
      hight: message.h,
      low: message.l,
      time: message.E,
      volumn: message.q,
      change,
      changePercent
    }
    dispatch(setDataTicker({ symbol: nameSymbol, value: newData }))
  }
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
      // @kline_1m | @miniTicker | @depth | @aggTrade
      const streams = [] as string[]
      symbols.forEach(s => {
        streams.push(`${s.toLowerCase()}@miniTicker`)
      });
      streams.push(`${symbolDrop.toLowerCase()}@depth10`)
      streams.push(`${symbolDrop.toLowerCase()}@aggTrade`)
      streams.push(`${symbolDrop.toLowerCase()}@kline_${klineIntervalStore}`)
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
        if (message.asks) {
          // depth
          handleDepthUpdate(message)
        }
        if (!message.s || !['24hrMiniTicker', 'aggTrade', 'kline'].includes(typeMess)) return
        const nameSymbol = message.s.toLowerCase() || ''
        if (message.e === '24hrMiniTicker') {
          // ticker
          handleUpdateMiniTicker(message)
          return
        }
        if (nameSymbol !== symbolDrop) return
        if (message.e === "aggTrade") {
          handleAggTrade(message)
        } else {
          handleUpdateKline(message)
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
    // dispatch(resetKlineData())
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