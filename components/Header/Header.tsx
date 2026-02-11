"use client";
import Cookies from "js-cookie";
import BaseIcon from "@/components/BaseIcon";
import "./Header.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/appContext";
import { _formatNumber, _getLabelForSymbol } from "@/lib/global";
import ChangeBox from "../ChangeBox/ChangeBox";
import useBinanceSocket from "@/hooks/useBinanceSocket";

import { setSymbol } from "@/store/selectSymbol";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const symbolStore = useSelector((state: RootState) => state.symbol.value);
  const dispatch = useDispatch();
  const { dataTicker } = useBinanceSocket({
    streamType: "ticker",
  });
  const router = useRouter();
  const pathname = usePathname();
  const links = [
    { title: "Trade", path: "/trade" },
    { title: "Markets", path: "/markets" },
    { title: "Portfolio", path: "/portfolio" },
    { title: "Earn", path: "/earn" },
  ];
  const { mode, setMode } = useContext(AppContext) as {
    mode: string;
    setMode: (value: string) => void;
  };
  useEffect(() => {
    Cookies.set("theme", mode, { expires: 7 });
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
  return (
    <header className="w-full header">
      <div className="top">
        <div className="box-left flex flex-wrap content-center justify-center">
          <div className="flex content-center justify-center h-[28px] mr-8">
            <BaseIcon
              className="cursor-pointer mr-2 p-0.5"
              width={22}
              height={22}
              name="logo"
              useMode={false}
              onClick={() => router.push("/")}
            />
            <p className="logo text">Test</p>
          </div>
          <div className="flex flex-row flex-wrap justify-center content-center">
            {links.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm mr-6 leading-5 ${pathname === item.path ? "text" : "text-blur"}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="box-right flex flex-row flex-wrap content-center">
          <BaseIcon
            tooltip={mode === "dark" ? "Light mode" : "Dark mode"}
            className="cursor-pointer p-2 mr-3"
            width={20}
            height={20}
            name={mode === "dark" ? "light" : "dark"}
            useMode={false}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          />
          <BaseIcon
            tooltip="Wallet"
            className="cursor-pointer p-2 mr-3"
            width={20}
            height={20}
            name="wallet"
          />
          <BaseIcon
            tooltip="Logout"
            className="cursor-pointer p-2"
            width={20}
            height={20}
            name="logout"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="flex flex-wrap flex-row content-center items-center">
          <div className="mr-6">
            <p className="text-blur text-sm uppercase">
              {_getLabelForSymbol(symbolStore)}
            </p>
            <h2 className="text text-2xl font-bold">
              ${_formatNumber(dataTicker[symbolStore]?.close)}
            </h2>
          </div>
          <div className="mr-6">
            {ChangeBox(
              dataTicker[symbolStore]?.change,
              "box-price",
              "!text-base",
              16,
              true,
            )}
          </div>
          <div className="flex flex-wrap flex-row content-center">
            <div className="mr-6">
              <p className="text-blur text-sm">24h High</p>
              <p className="text text-sm">
                ${_formatNumber(dataTicker[symbolStore]?.hight)}
              </p>
            </div>
            <div className="mr-6">
              <p className="text-blur text-sm">24h Low</p>
              <p className="text text-sm">
                ${_formatNumber(dataTicker[symbolStore]?.low)}
              </p>
            </div>
            <div>
              <p className="text-blur text-sm">24h Volume</p>
              <p className="text text-sm">
                ${_formatNumber(dataTicker[symbolStore]?.volumn)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
