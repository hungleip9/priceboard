"use client";
import "./Radio.scss";
import { useState } from "react";
interface Props {
  onSelect: (val: string) => void;
}
const timeframeOptions = [
  { value: "1H", label: "1H" },
  { value: "4H", label: "4H" },
  { value: "1D", label: "1D" },
  { value: "1W", label: "1W" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "1Y", label: "1Y" },
];

export default function Radio({ onSelect }: Props) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const handleChange = (val: string) => {
    setSelectedTimeframe(val);
    onSelect(val);
  };

  return (
    <div className="flex flex-wrap items-center justify-center rounded-lg">
      {timeframeOptions.map((option) => (
        <div key={option.value} className="relative mr-1">
          <input
            type="radio"
            id={option.value}
            name="timeframe"
            value={option.value}
            checked={selectedTimeframe === option.value}
            onChange={(e) => handleChange(e.target.value)}
            className="sr-only"
          />
          <label
            htmlFor={option.value}
            className={`flex items-center justify-center w-[40px] h-[28px] text-sm cursor-pointer leading-5
              ${selectedTimeframe === option.value ? "active" : "text-blur"}
            `}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
