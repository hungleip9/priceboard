import React from "react";

interface BaseIconProps {
  name: string; // Tên file SVG (không cần .svg)
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
  onClick?: () => void;
}

const BaseIcon: React.FC<BaseIconProps> = ({
  name,
  width = 24,
  height = 24,
  className = "",
  color,
  onClick,
}) => {
  // Đường dẫn đến file SVG trong thư mục public
  const iconPath = `/icons/${name}.svg`;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Icon "${name}" not found at ${iconPath}`);
    e.currentTarget.style.display = "none";
  };

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...(color && { fill: color }),
  };

  return (
    <div className="p-2">
      <img
        src={iconPath}
        alt={`${name} icon`}
        style={style}
        className={`base-icon ${className}`}
        onClick={onClick}
        loading="lazy"
      />
    </div>
  );
};

export default BaseIcon;
