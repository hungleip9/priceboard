"use client";
import { useState } from "react";
import "./Markets.scss";
import BaseIcon from "@/components/BaseIcon";
import ChangeBox from "@/components/ChangeBox/ChangeBox";
import useBinanceSocket from "@/hooks/useBinanceSocket";
import { _formatNumber, _numberShortener } from "@/lib/global";
import { setSymbol } from "@/store/selectSymbol";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";

type CryptoPair = {
  symbol: string;
  label: string;
  watchList: boolean;
};
export default function Markets() {
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const dispatch = useDispatch();
  const { dataTicker } = useBinanceSocket({
    streamType: "ticker",
  });
  const initialData: CryptoPair[] = [
    {
      symbol: "btcusdt",
      label: "BTC/USD",
      watchList: true,
    },
    {
      symbol: "ethusdt",
      label: "ETH/USD",
      watchList: false,
    },
    {
      symbol: "bnbusdt",
      label: "BNB/USD",
      watchList: false,
    },
    {
      symbol: "solusdt",
      label: "SOL/USD",
      watchList: true,
    },
    {
      symbol: "adausdt",
      label: "ADA/USD",
      watchList: false,
    },
    {
      symbol: "xrpusdt",
      label: "XRP/USD",
      watchList: false,
    },
  ];
  const [cryptoData, setCryptoData] = useState<CryptoPair[]>(initialData);
  const getSymbol = (symbol = ""): string => {
    if (!symbol) return "";
    return symbol.replace("/", "");
  };
  const addToWatchList = (index = 0) => {
    const newData = [...cryptoData];
    newData[index] = {
      ...newData[index],
      watchList: !newData[index].watchList,
    };
    setCryptoData(newData);
  };
  const starBox = (watchList = false, index = 0) => {
    const name = watchList ? "starCheck" : "star";
    return (
      <BaseIcon
        width={14}
        height={14}
        name={name}
        className="mr-3 cursor-pointer"
        onClick={() => addToWatchList(index)}
      />
    );
  };
  return (
    <div className="markets text border">
      <div className="title">
        <h3 className="text">Markets</h3>
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="w-[118px] text-left">Pair</th>
              <th className="w-[100px] text-right">Price</th>
              <th className="text-right whitespace-nowrap">24h Stats</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr
                key={crypto.label}
                className={`cursor-pointer ${symbolStore === crypto.symbol ? "row-select" : ""}`}
                onClick={() => dispatch(setSymbol(crypto.symbol))}
              >
                <td className="flex justify-center h-full">
                  {starBox(crypto.watchList, index)}
                  <div className="flex flex-col justify-center h-full">
                    <p className="text text-base">{crypto.label}</p>
                    <p className="text-blur text-left text-xs">
                      {getSymbol(crypto.label)}
                    </p>
                  </div>
                </td>
                <td className="text-right text-base">
                  ${_formatNumber(dataTicker[crypto.symbol]?.close)}
                </td>
                <td>
                  <div className="flex flex-col content-end items-end pr-2">
                    {ChangeBox(dataTicker[crypto.symbol]?.change, "", "ml-1")}
                    <p className="text-blur text-xs">
                      ${_numberShortener(dataTicker[crypto.symbol]?.volumn)}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
