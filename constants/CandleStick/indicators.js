import { getFigureClass } from "klinecharts";
import { _numberShortener } from "@/lib/global";

export function VOL_CUSTOM() {
  return {
    name: "VOL_CUSTOM",
    shortName: "Volume",
    zLevel: -1,
    figures: [],
    calc: (dataList) => dataList.map((data) => ({ ...data })),
    createTooltipDataSource: ({ indicator, crosshair, chart }) => {
      const { candle } = chart.getStyles();
      const upColor = candle.bar.upColor;
      const downColor = candle.bar.downColor;
      const result = indicator.result;
      const data = result[crosshair.dataIndex];
      if (data) {
        const color = data.open <= data.close ? upColor : downColor;
        return {
          legends: [
            {
              title: "",
              value: { text: _numberShortener(data.volume, 6), color },
            },
          ],
        };
      }
      return {};
    },
    draw: ({ ctx, chart, indicator, bounding, xAxis }) => {
      const { candle } = chart.getStyles();
      const upColor = candle.bar.upColor;
      const downColor = candle.bar.downColor;
      const { realFrom, realTo } = chart.getVisibleRange();
      const { gapBar, halfGapBar } = chart.getBarSpace();
      const { result } = indicator;
      let maxVolume = 0;
      for (let i = realFrom; i < realTo; i++) {
        const data = result[i];
        if (data) {
          maxVolume = Math.max(maxVolume, data.volume);
        }
      }
      const totalHeight = bounding.height * 0.4;
      const Rect = getFigureClass("rect");
      for (let i = realFrom; i < realTo; i++) {
        const data = result[i];
        if (data) {
          const height = Math.round((data.volume / maxVolume) * totalHeight);
          const color = data.open <= data.close ? upColor : downColor;
          new Rect({
            name: "rect",
            attrs: {
              x: xAxis.convertToPixel(i) - halfGapBar,
              y: bounding.height - height,
              width: gapBar,
              height,
            },
            styles: { color },
          }).draw(ctx);
        }
      }
      return true;
    },
  };
}
