"use client";
import React, { useState, createContext } from "react";

export const AppContext = createContext({});

export const AppProvider = ({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: string;
}) => {
  const [mode, setMode] = useState<string>(initialTheme);

  return (
    <AppContext.Provider value={{ mode, setMode }}>
      {children}
    </AppContext.Provider>
  );
};
