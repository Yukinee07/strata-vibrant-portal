import React, { createContext, useContext, useState, ReactNode } from "react";

interface DeveloperContextType {
  isDeveloper: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DeveloperContext = createContext<DeveloperContextType | undefined>(undefined);

export const DeveloperProvider = ({ children }: { children: ReactNode }) => {
  const [isDeveloper, setIsDeveloper] = useState(false);

  const login = (username: string, password: string): boolean => {
    if (username === "Developer" && password === "Developer") {
      setIsDeveloper(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsDeveloper(false);
  };

  return (
    <DeveloperContext.Provider value={{ isDeveloper, login, logout }}>
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDeveloper = () => {
  const context = useContext(DeveloperContext);
  if (context === undefined) {
    throw new Error("useDeveloper must be used within a DeveloperProvider");
  }
  return context;
};
