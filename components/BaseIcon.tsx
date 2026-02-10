"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Tooltip } from "antd";
import { AppContext } from "@/context/appContext";

interface BaseIconProps {
  name: string; // Tên file SVG (không cần .svg)
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  tooltip?: string;
  useMode?: boolean;
  onClick?: () => void;
}

const BaseIcon: React.FC<BaseIconProps> = ({
  name,
  width = 24,
  height = 24,
  className = "",
  color,
  tooltip = "",
  useMode = true,
  onClick,
}) => {
  const { mode } = useContext(AppContext) as {
    mode: string;
  };
  const nameMap = useMode && mode === "dark" ? name + "-dark" : name;
  const iconPath = `/icons/${nameMap}.svg`;

  const iconElement = (
    <div
      className={`${className} flex flex-wrap content-center`}
      onClick={onClick}
    >
      <Image
        src={iconPath}
        alt={`${name} icon`}
        width={width}
        height={height}
        className="object-contain"
        loading="lazy"
        unoptimized={true}
        style={{
          filter: color ? "inherit" : undefined,
        }}
        onClick={onClick}
      />
    </div>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{iconElement}</Tooltip>;
  }

  return iconElement;
};

export default BaseIcon;
