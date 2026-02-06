// hooks/useBinanceSocket.ts
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useWebSocket } from './useWebSocket';
import { TradeData } from '@/types/binance';

interface UseBinanceSocketProps {
  symbol: string;
  streamType?: 'trade' | 'kline' | 'depth' | 'ticker';
}

export function useBinanceSocket({
  symbol = 'btcusdt',
  streamType = 'trade'
}: UseBinanceSocketProps) {

  // Sử dụng generic type TradeData
  const { isConnected, lastMessage, send } = useWebSocket<TradeData>(
    `${process.env.NEXT_PUBLIC_WS_API}`
  );

  // Subscribe khi kết nối
  useEffect(() => {
    if (isConnected) {
      send({
        method: "SUBSCRIBE",
        params: [`${symbol.toLowerCase()}@${streamType}`],
        id: Date.now()
      });
    }
  }, [isConnected, send, symbol, streamType]);

  // Cập nhật data khi nhận message
  const price = useMemo(() => {
    if (!lastMessage || lastMessage?.e !== 'trade') return null;
    return lastMessage.p;
  }, [lastMessage]);

  return {
    price,
    // Metadata
    isConnected,
    symbol: symbol.toUpperCase(),
    streamType,

    // Raw
    rawMessage: lastMessage
  };
}