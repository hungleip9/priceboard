"use client";
import { useState } from "react";
import "./Markets.scss";
import BaseIcon from "@/components/BaseIcon";
type CryptoPair = {
  symbol: string;
  price: string;
  change: string;
  changePercent: number;
  volume: string;
  watchList: boolean;
};
export default function Markets() {
  const initialData: CryptoPair[] = [
    {
      symbol: "BTC/USD",
      price: "65432.15",
      change: "+1.92%",
      changePercent: 1.92,
      volume: "2845.1M",
      watchList: true,
    },
    {
      symbol: "ETH/USD",
      price: "3234.89",
      change: "-1.38%",
      changePercent: -1.38,
      volume: "1234.6M",
      watchList: false,
    },
    {
      symbol: "BNB/USD",
      price: "584.32",
      change: "+2.18%",
      changePercent: 2.18,
      volume: "567.9M",
      watchList: false,
    },
    {
      symbol: "SOL/USD",
      price: "142.67",
      change: "+6.13%",
      changePercent: 6.13,
      volume: "345.7M",
      watchList: true,
    },
    {
      symbol: "ADA/USD",
      price: "0.52",
      change: "-2.30%",
      changePercent: -2.3,
      volume: "234.6M",
      watchList: false,
    },
    {
      symbol: "XRP/USD",
      price: "0.68",
      change: "+3.57%",
      changePercent: 3.57,
      volume: "456.8M",
      watchList: false,
    },
  ];
  const [cryptoData, setCryptoData] = useState<CryptoPair[]>(initialData);
  const [selectSymbol, setSelectSymbol] = useState<string>(
    cryptoData[0].symbol ?? "",
  );
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
  const changeBox = (changePercent = 0) => {
    if (changePercent >= 0) {
      return (
        <>
          <div
            key={changePercent}
            className="text-green flex flex-row content-center"
          >
            <BaseIcon width={12} height={12} name="arr-up" />
            <span className="text-sm">+{changePercent}</span>
          </div>
        </>
      );
    }
    return (
      <>
        <div
          key={changePercent}
          className="text-red flex flex-row content-center"
        >
          <BaseIcon width={12} height={12} name="arr-down" />
          <span className="text-sm">{changePercent}</span>
        </div>
      </>
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
                key={crypto.symbol}
                className={selectSymbol === crypto.symbol ? "row-select" : ""}
                onClick={() => setSelectSymbol(crypto.symbol)}
              >
                <td className="flex justify-center h-full">
                  {starBox(crypto.watchList, index)}
                  <div className="flex flex-col justify-center h-full">
                    <p className="text text-base">{crypto.symbol}</p>
                    <p className="text-blur text-left text-xs">
                      {getSymbol(crypto.symbol)}
                    </p>
                  </div>
                </td>
                <td className="text-right text-base">${crypto.price}</td>
                <td>
                  <div className="flex flex-col content-end items-end pr-2">
                    {changeBox(crypto.changePercent)}
                    <p className="text-blur text-xs">${crypto.volume}</p>
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
