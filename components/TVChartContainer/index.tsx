import styles from "./index.module.css";
import { useContext, useEffect, useRef } from "react";
import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  widget,
  IChartingLibraryWidget,
} from "@/public/charting_library";
import { AppContext } from "@/context/appContext";
import { UDFCompatibleDatafeed } from "@/public/datafeeds/udf/src/udf-compatible-datafeed";
interface Props {
  symbol: string;
  interval: string;
  library_path?: string;
  locale?: string;
  client_id: string;
  user_id: string;
  fullscreen?: boolean;
  autosize?: boolean;
  timezone?: string;
}
export const TVChartContainer = ({
  symbol,
  interval,
  library_path = "/charting_library/",
  locale = "vi",
  client_id,
  user_id,
  fullscreen = false,
  autosize = true,
}: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { mode } = useContext(AppContext) as {
    mode: string;
  };
  const tvWidget = useRef<IChartingLibraryWidget | null>(null);

  const initChart = () => {
    // Kiểm tra null trước khi sử dụng
    if (!chartContainerRef.current) return;
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: symbol,
      datafeed: new UDFCompatibleDatafeed(
        "https://demo_feed.tradingview.com",
        undefined,
        {
          maxResponseLength: 1000,
          expectedOrder: "latestFirst",
        },
      ),
      interval: interval as ResolutionString,
      container: chartContainerRef.current, // Đã check null
      library_path: library_path,
      locale: locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: client_id,
      user_id: user_id,
      fullscreen: fullscreen,
      autosize: autosize,
      timezone: "Asia/Ho_Chi_Minh",
      theme: mode === "dark" ? "Dark" : "Light",
    };
    tvWidget.current = new widget(widgetOptions);
  };
  useEffect(() => {
    initChart();
    return () => {
      if (tvWidget.current) {
        tvWidget.current.remove();
      }
    };
  }, []);
  useEffect(() => {
    if (tvWidget.current && symbol) {
      console.log("symbol: ", symbol);
      initChart();
    }
    return () => {
      if (tvWidget.current) {
        tvWidget.current.remove();
      }
    };
  }, [mode]);

  return <div ref={chartContainerRef} className={styles.TVChartContainer} />;
};
