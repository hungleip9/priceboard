// hooks/useWebSocket.ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket<T>(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        setLastMessage(JSON.parse(event.data) as T);
      } catch (error) {
        console.log(error);
      }
    };

    ws.current.onerror = (error) => {
      console.log(error);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };
  }, [url]);

  const disconnect = useCallback(() => {
    ws.current?.close();
    ws.current = null;
  }, []);
  const send = useCallback((data: unknown) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    isConnected,
    lastMessage,
    connect,
    disconnect,
    send
  };
}