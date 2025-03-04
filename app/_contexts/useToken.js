"use client";
import { createContext, useContext, useState } from "react";

const tokenContext = createContext();
export default function TokenProvider({ children }) {
  const [token, setToken] = useState(false);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}

export const useToken = () => useContext(tokenContext);
