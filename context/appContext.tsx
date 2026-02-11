"use client";

import React, { useState, createContext } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

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
    <Provider store={store}>
      <AppContext.Provider value={{ mode, setMode }}>
        {children}
      </AppContext.Provider>
    </Provider>
  );
};
