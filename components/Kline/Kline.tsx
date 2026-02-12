"use client";
import { useEffect, useRef, useContext } from "react";
import {
  init,
  Nullable,
  Chart,
  FormatDateParams,
  KLineData,
  registerYAxis,
} from "klinecharts";
import { _formatNumber, _getFormatTime } from "@/lib/global";
import fetDataKline from "@/api/useFetchDataKline";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { AppContext } from "@/context/appContext";

interface Props {
  interval: string;
  symbol: string;
}
export default function Kline({ interval = "1d", symbol }: Props) {
  const { mode } = useContext(AppContext) as {
    mode: string;
  };
  const upColor = mode === "dark" ? "#22c55e" : "#059669";
  const downColor = mode === "dark" ? "#ef4444" : "#dc2626";
  const chartRef = useRef<Nullable<Chart>>(null);
  const newLine = useSelector((state: RootState) => state.klineData.value);
  const subscriptionCallback = useRef<((bar: KLineData) => void) | null>(null);
  const dataStore = useSelector((state: RootState) => state.klineAllData.value);

  registerYAxis({
    name: "customYAxisBasic",
    displayValueToText: (value) => `$${value}`,
  });

  fetDataKline({ symbol: symbol, interval: interval, limit: 50 });
  const handleSetDataLoader = () => {
    if (!chartRef.current) return;
    chartRef.current.setDataLoader({
      getBars: ({ callback }) => {
        const initDataKline = dataStore[`${symbol}-${interval}`] || [];
        callback(JSON.parse(JSON.stringify(initDataKline)));
      },
      subscribeBar: (params) => {
        if (subscriptionCallback.current) return;
        subscriptionCallback.current = params.callback; // Lưu callback để dùng sau
        return "my-subscription"; // string hoặc number
      },
      unsubscribeBar: () => {
        if (subscriptionCallback.current) {
          subscriptionCallback.current = null;
        }
      },
    });
  };
  function setFormat() {
    if (!chartRef.current) return;
    chartRef.current.setFormatter({
      formatDate: ({ timestamp }: FormatDateParams): string => {
        const date = _getFormatTime(timestamp, { second: false }) || null;
        return date ? date : "";
      },
    });
  }
  async function setStylesKline() {
    if (!chartRef.current) return;
    chartRef.current.setStyles({
      grid: {
        show: false,
      },
      candle: {
        // 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
        type: "candle_solid",
        bar: {
          upColor: upColor,
          downColor: downColor,
          noChangeColor: upColor,
          upBorderColor: upColor,
          downBorderColor: downColor,
          noChangeBorderColor: upColor,
          upWickColor: upColor,
          downWickColor: downColor,
          noChangeWickColor: upColor,
        },
        area: {
          lineSize: 1.5,
          lineColor: "#089981",
          value: "close",
        },
        priceMark: {
          show: true,
        },
        tooltip: {
          showRule: "none", // 'none' : 'always'
          showType: "standard",
          rect: {
            // 'fixed' | 'pointer'
            position: "pointer",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 4,
            borderSize: 1,
            borderColor: "#eee",
          },
        },
      },
      indicator: {
        ohlc: {
          upColor: upColor,
          downColor: downColor,
          noChangeColor: upColor,
        },
        bars: [
          {
            style: "fill",
            borderStyle: "solid",
            borderSize: 1,
            borderDashedValue: [2, 2],
            upColor: upColor,
            downColor: downColor,
            noChangeColor: upColor,
          },
        ],
        circles: [
          {
            // 'fill' | 'stroke' | 'stroke_fill'
            style: "fill",
            // 'solid' | 'dashed'
            borderStyle: "solid",
            borderSize: 1,
            borderDashedValue: [2, 2],
            upColor: upColor,
            downColor: downColor,
            noChangeColor: upColor,
          },
        ],
        lastValueMark: {
          show: false,
          text: {
            show: true,
            // 'fill' | 'stroke' | 'stroke_fill'
            style: "stroke_fill",
            color: "#FFFFFF",
            size: 11,
            family: "Sora",
            weight: "normal",
            // 'solid' | 'dashed'
            borderStyle: "dashed",
            borderSize: 1,
            borderDashedValue: [2, 2],
            paddingLeft: 4,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            borderRadius: 2,
          },
        },
        tooltip: {
          // 'always' | 'follow_cross' | 'none'
          showRule: "none",
          showType: "standard",
        },
      },
      xAxis: {
        show: true,
        size: "auto",
        tickText: {
          show: true,
          color: "#888888",
          family: "Sora",
          weight: "normal",
          size: 12,
          marginStart: 4,
          marginEnd: 4,
        },
        tickLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        show: true,
        size: "auto",
        axisLine: {
          show: false,
        },
        tickText: {
          show: true,
          color: "#888888",
          family: "Sora",
          weight: "normal",
          size: 12,
          marginStart: 4,
          marginEnd: 4,
        },
        tickLine: {
          show: false,
        },
      },
    });
  }
  const initData = () => {
    if (chartRef.current) {
      chartRef.current = null;
    }
    chartRef.current = init("klinecharts", {
      layout: [
        {
          type: "candle",
          options: {
            axis: {
              name: "customYAxisBasic",
            },
          },
        },
      ],
    });
    if (!chartRef.current) return;
    chartRef.current.setSymbol({ ticker: "TestSymbol" });
    chartRef.current.setPeriod({ span: 1, type: "day" });
    handleSetDataLoader();
    setFormat();
    setStylesKline();
  };

  useEffect(() => {
    initData();
    return () => {
      if (chartRef.current) {
        chartRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    // re render data
    handleSetDataLoader();
  }, [dataStore[`${symbol}-${interval}`]]);
  useEffect(() => {
    // re render style
    setStylesKline();
  }, [mode]);

  useEffect(() => {
    // re render ws
    const initDataKline = dataStore[`${symbol}-${interval}`] || [];
    if (!subscriptionCallback.current || !newLine || !initDataKline.length)
      return;
    subscriptionCallback.current(newLine);
  }, [newLine]);

  return <div id="klinecharts" className="w-full h-full" />;
}
