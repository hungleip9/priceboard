"use client";
import { useEffect } from "react";
import { init, Nullable, Chart, FormatDateParams } from "klinecharts";
import { _formatNumber, _getFormatTime } from "@/lib/global";

export default function Kline() {
  const upColor = "#059669"; //dark: #22c55e
  const downColor = "#dc2626"; //dark: #ef4444
  async function setStylesKline(klinecharts: Nullable<Chart>) {
    if (!klinecharts) return;
    klinecharts.setStyles({
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
          show: false,
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
  useEffect(() => {
    const chart = init("klinecharts", {
      formatter: {
        formatDate: ({ timestamp }: FormatDateParams): string => {
          let date = _getFormatTime(timestamp, { second: true }) || null;
          if (date) {
            date = date.slice(0, 5);
          }
          return date ? date : "";
        },
        formatBigNumber: (value: string | number) => {
          console.log("value: ", value);
          return `${value} VND`;
        },
      },
    });
    chart?.setSymbol({ ticker: "TestSymbol" });
    chart?.setPeriod({ span: 1, type: "day" });
    chart?.setDataLoader({
      getBars: ({ callback }) => {
        callback([
          {
            timestamp: 1517846400000,
            open: 7424.6,
            high: 7511.3,
            low: 6032.3,
            close: 7310.1,
            volume: 224461,
          },
          {
            timestamp: 1517932800000,
            open: 7310.1,
            high: 8499.9,
            low: 6810,
            close: 8165.4,
            volume: 148807,
          },
          {
            timestamp: 1518019200000,
            open: 8166.7,
            high: 8700.8,
            low: 7400,
            close: 8245.1,
            volume: 24467,
          },
          {
            timestamp: 1518105600000,
            open: 8244,
            high: 8494,
            low: 7760,
            close: 8364,
            volume: 29834,
          },
          {
            timestamp: 1518192000000,
            open: 8363.6,
            high: 9036.7,
            low: 8269.8,
            close: 8311.9,
            volume: 28203,
          },
          {
            timestamp: 1518278400000,
            open: 8301,
            high: 8569.4,
            low: 7820.2,
            close: 8426,
            volume: 59854,
          },
          {
            timestamp: 1518364800000,
            open: 8426,
            high: 8838,
            low: 8024,
            close: 8640,
            volume: 54457,
          },
          {
            timestamp: 1518451200000,
            open: 8640,
            high: 8976.8,
            low: 8360,
            close: 8500,
            volume: 51156,
          },
          {
            timestamp: 1518537600000,
            open: 8504.9,
            high: 9307.3,
            low: 8474.3,
            close: 9307.3,
            volume: 49118,
          },
          {
            timestamp: 1518624000000,
            open: 9307.3,
            high: 9897,
            low: 9182.2,
            close: 9774,
            volume: 48092,
          },
        ]);
      },
    });
    setStylesKline(chart);
  }, []);
  return <div id="klinecharts" className="w-full h-full" />;
}
