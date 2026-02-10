import "./Button.scss";
import React, { useState, createContext } from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  colorText?: string;
  type?: "prime" | "success" | "danger" | "default" | "warning";
  onClick?: () => void;
}
export default function Button({
  children,
  className,
  color = "",
  colorText = "",
  type = "prime",
  onClick,
}: Props) {
  return (
    <button
      className={`btn ${type} ` + className}
      style={{
        color: colorText,
        background: color,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
