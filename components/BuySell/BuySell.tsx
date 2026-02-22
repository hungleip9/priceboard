"use client";
import { useState } from "react";
import "./BuySell.scss";
import BaseIcon from "@/components/BaseIcon";
import Button from "@/components/Button/Buttom";
import { InputNumber, Slider } from "antd";
import { _formatNumber, _numberFormatDefault } from "@/lib/global";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
export default function BuySell() {
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const dataTickerStore = useSelector(
    (state: RootState) => state.dataTicker.value,
  );
  const [buySell, setBuySell] = useState("buy");
  const tab = () => {
    return (
      <>
        <div
          className={`tab ${buySell === "buy" ? "tab-buy" : ""}`}
          onClick={() => setBuySell("buy")}
        >
          <BaseIcon
            width={14}
            height={14}
            name={`arr-brk-up${buySell === "buy" ? "-green" : ""}`}
            className="mr-[7px]"
          />
          <p className="text-sm text-blur font-bold">Buy</p>
        </div>
        <div
          className={`tab ${buySell === "sell" ? "tab-sell" : ""}`}
          onClick={() => setBuySell("sell")}
        >
          <BaseIcon
            width={14}
            height={14}
            name={`arr-brk-down${buySell === "sell" ? "-red" : ""}`}
            className="mr-[7px]"
          />
          <p className="text-sm text-blur font-bold">Sell</p>
        </div>
      </>
    );
  };
  const wallet = {
    monney: 10000,
    coin: 0.5,
  };
  const [formData, setFormData] = useState({
    price: 0,
    amount: 0.25,
    amountPercent: 50,
  });
  const handleChange = (
    value: string | number | null,
    key: "price" | "amount" | "amountPercent",
  ) => {
    const newData = { ...formData };
    newData[key] = Number(value);
    if (key === "amount") {
      newData.amountPercent = (Number(value) / 0.5) * 100;
    }
    if (key === "amountPercent") {
      newData.amount = (Number(value) / 100) * 0.5;
    }
    setFormData({ ...newData });
  };
  const checkDisabled = () => {
    if (buySell === "buy" && formData.price * formData.amount > wallet.monney)
      return true;
    if (buySell === "sell" && formData.amount > wallet.coin) return true;
    return false;
  };

  return (
    <div className="buy-sell-box text border">
      <div className="tabs">{tab()}</div>
      <div className="content">
        <div className="flex flex-row mb-4">
          <Button className="mr-2 w-[129.1px]">
            <p className="text-sm">Limit Order</p>
          </Button>
          <Button className="w-[129.1px]" type="default">
            <p className="text-sm">Market Order</p>
          </Button>
        </div>
        <div className="available-balance">
          <div className="flex flex-row mb-3">
            <BaseIcon
              width={16}
              height={16}
              name="wallet-mini"
              className="mr-2"
            />
            <p className="text-blur text-xs">Available Balance</p>
          </div>
          <div className="inline-block w-[117.1px] h-[35.99px]">
            <p className="text-blur text-xs">USD</p>
            <p className="text font-bold text-sm">
              ${_formatNumber(wallet.monney)}
            </p>
          </div>
          <div className="inline-block w-[117.1px] h-[35.99px]">
            <p className="text-blur text-xs">BTC</p>
            <p className="text font-bold text-sm">
              {_formatNumber(wallet.coin)}
            </p>
          </div>
        </div>
        <div className="box-price">
          <p className="text text-sm mb-2">Price</p>
          <InputNumber
            min={0}
            suffix="USD"
            name="price"
            value={formData.price}
            controls={false}
            style={{ width: "100%" }}
            onChange={(val) => {
              handleChange(val, "price");
            }}
          />
        </div>
        <div className="box-amount">
          <p className="text text-sm mb-2">Amount</p>
          <InputNumber
            min={0}
            suffix="BTC"
            name="amount"
            value={formData.amount}
            controls={false}
            style={{ width: "100%" }}
            onChange={(val) => {
              handleChange(val, "amount");
            }}
          />
        </div>
        <div className="amount-slice mb-4">
          <div className="flex flex-row justify-between mb-3">
            <p className="text-sm">Amount</p>
            <p className="text-blue text-sm leading-5">
              {_formatNumber(formData.amountPercent, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              %
            </p>
          </div>
          <div className="h-[16px] mb-3">
            <Slider
              styles={{
                rail: {
                  background: "var(--slice-rail)",
                  height: "16px",
                  borderRadius: "8px",
                  border: "0.8px solid var(--border-default)",
                },
                track: {
                  background: "var(--bg-button-prime)",
                  height: "16px",
                  borderRadius: "8px",
                },

                handle: {
                  boxShadow: "0 2px 8px var(--bg-button-prime)",
                },
              }}
              value={formData.amountPercent}
              onChange={(val) => {
                handleChange(val, "amountPercent");
              }}
            />
          </div>
          <div className="btn-slice-box mt-3">
            <Button
              className="w-[63.55px]"
              type="default"
              onClick={() => handleChange(25, "amountPercent")}
            >
              <p className="text-sm">25%</p>
            </Button>
            <Button
              className="w-[63.55px]"
              type="default"
              onClick={() => handleChange(50, "amountPercent")}
            >
              <p className="text-sm">50%</p>
            </Button>
            <Button
              className="w-[63.55px]"
              type="default"
              onClick={() => handleChange(75, "amountPercent")}
            >
              <p className="text-sm">75%</p>
            </Button>
            <Button
              className="w-[63.55px]"
              type="default"
              onClick={() => handleChange(100, "amountPercent")}
            >
              <p className="text-sm">100%</p>
            </Button>
          </div>
        </div>
        <div className="total-box mb-4">
          <div className="flex flex-row justify-between items-center mb-2">
            <p className="text-blur text-sm">Total</p>
            <div>
              <p className="text font-bold text-base">
                ${_numberFormatDefault(formData.price * formData.amount) || "0"}
              </p>
              <p className="text-blur text-xs text-right">USD</p>
            </div>
          </div>
          <div className="flex flex-row h-[40.78px]">
            <BaseIcon
              width={14}
              height={14}
              name={`info`}
              useMode={false}
              className="mr-[3px] content-start pt-[4px]"
            />
            <p className="text-blur text-xs">
              Limit order will execute when price reaches $
              {_formatNumber(dataTickerStore[symbolStore]?.close)}
            </p>
          </div>
        </div>
        <Button
          className="w-full h-[48px] mb-4"
          type={buySell === "buy" ? "success" : "danger"}
          disabled={checkDisabled()}
        >
          <p className="text-base font-bold leading-6">
            {buySell === "buy" ? "Buy" : "Sell"} BTC
          </p>
        </Button>
        <p className="text-blur text-xs text-center">
          Estimated fee: ~0.10% • Min order: $10
        </p>
      </div>
    </div>
  );
}
