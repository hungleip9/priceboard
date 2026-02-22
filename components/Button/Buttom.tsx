import "./Button.scss";
import React, { useState, createContext } from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  colorText?: string;
  type?: "prime" | "success" | "danger" | "default" | "warning";
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button({
  children,
  className,
  color = "",
  colorText = "",
  type = "prime",
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      className={`btn ${type} ` + className}
      style={{
        color: colorText,
        background: color,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
