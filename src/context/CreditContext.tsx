import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "@/api/apiClient";

interface CreditContextType {
  credits: number;
  refreshCredits: () => Promise<void>;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

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

  /**
   * Fetch credits from backend's /auth/:id endpoint
   * This is the authoritative source of credit information
   */
  const refreshCredits = async () => {
    try {
      const rawUser = localStorage.getItem("user");
      const user = rawUser ? JSON.parse(rawUser) : null;

      if (!user?.id) {
        console.warn("No user ID found, credits set to 0");
        setCredits(0);
        return;
      }

      // Call /auth/:id endpoint with bearer token (auto-attached by apiClient)
      const response = await apiClient.get(`/auth/${user.id}`);
      
      // Extract credits from response
      const fetchedCredits = response.data?.credits ?? response.data?.user?.credits ?? 0;
      setCredits(fetchedCredits);
    } catch (error) {
      console.error("Failed to refresh credits:", error);
      // Fail gracefully - don't crash the UI, keep previous credit value
      // Backend remains source of truth
    }
  };

  // Initial load when component mounts
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      refreshCredits();
    } else {
      setCredits(0);
    }
  }, []);

  return (
    <CreditContext.Provider value={{ credits, refreshCredits }}>
      {children}
    </CreditContext.Provider>
  );
};