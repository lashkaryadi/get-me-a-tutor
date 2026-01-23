import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserById } from "@/api/apiClient";

interface CreditContextType {
  credits: number;
  refreshCredits: () => Promise<void>;
}

const CreditContext = createContext<CreditContextType>({
  credits: 0,
  refreshCredits: async () => {},
});

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
};

interface CreditProviderProps {
  children: ReactNode;
}

export const CreditProvider = ({ children }: CreditProviderProps) => {
  const [credits, setCredits] = useState<number>(0);

  const refreshCredits = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) return;

      const res = await getUserById(user.id);
      setCredits(res.data?.credits ?? 0);
    } catch {
      setCredits(0);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      refreshCredits();
    } else {
      setCredits(0); // Default to 0 if no user
    }
  }, []);

  return (
    <CreditContext.Provider value={{ credits, refreshCredits }}>
      {children}
    </CreditContext.Provider>
  );
};