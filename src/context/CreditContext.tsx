import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "@/api/apiClient";

interface CreditContextType {
  credits: number;
  refreshCredits: () => Promise<void>;
  isRefreshing: boolean;
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Fetch credits from backend's /auth/me endpoint
   * This is the authoritative source of credit information
   * Includes retry logic to handle slow webhook processing
   */
  const refreshCredits = async () => {
    const maxRetries = 3;
    setIsRefreshing(true);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const rawUser = localStorage.getItem("user");
        const user = rawUser ? JSON.parse(rawUser) : null;

        if (!user?.id) {
          console.warn("No user ID found, credits set to 0");
          setCredits(0);
          setIsRefreshing(false);
          return;
        }

        // Call /auth/:id endpoint with bearer token (auto-attached by apiClient)
        const response = await apiClient.get(`/auth/me`);

        // Extract credits from response
        const fetchedCredits = response.data?.credits ?? response.data?.user?.credits ?? 0;
        setCredits(fetchedCredits);
        setIsRefreshing(false);
        return; // Success!

      } catch (error) {
        console.error(`Credit refresh attempt ${attempt}/${maxRetries} failed:`, error);

        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          const delay = Math.pow(2, attempt - 1) * 1000;
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          // Final attempt failed - throw error for caller to handle
          setIsRefreshing(false);
          throw error;
        }
      }
    }
  };

  // Initial load when component mounts
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      refreshCredits().catch((error) => {
        console.error("Initial credit fetch failed:", error);
        // Don't crash - just set credits to 0
        setCredits(0);
        setIsRefreshing(false);
      });
    } else {
      setCredits(0);
    }
  }, []);

  return (
    <CreditContext.Provider value={{ credits, refreshCredits, isRefreshing }}>
      {children}
    </CreditContext.Provider>
  );
};