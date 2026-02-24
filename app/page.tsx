"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    console.log("mount");
    const timeInterVal = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      console.log("unMout");
      clearInterval(timeInterVal);
    };
  }, []);
  useEffect(() => {
    console.log("update: ", time);
  }, [time]);
  return (
    <div>
      <p className="text">Page</p>
      <Link
        key="/trade"
        href="/trade"
        className={`text underline text-2xl mr-6 leading-5`}
      >
        Go to Trade
      </Link>
    </div>
  );
}
