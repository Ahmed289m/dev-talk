"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const postContext = createContext();

export function PostProvider({ children }) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <postContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </postContext.Provider>
  );
}

// Custom hook to use PostContext
export function usePostContext() {
  return useContext(postContext);
}
