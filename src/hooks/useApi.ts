import apiClient from "@/api/apiClient";
import { useState, useEffect } from "react";


interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch?: () => Promise<void>;
}

/**
 * Custom hook for fetching data from the API
 * Handles loading, errors, and provides a refetch function
 * Automatically includes Authorization header via apiClient interceptor
 */
export function useApi<T>(endpoint: string): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  
  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await apiClient.get(endpoint);
      setState({ data: response.data, loading: false, error: null });
    } catch (error: unknown) {
      let message = "Failed to fetch data";

      if (error instanceof Error) {
        message = error.message;
      }

      // Handle specific HTTP errors
      if ((error as any)?.response?.status === 401) {
        message = "Unauthorized - please log in again";
      } else if ((error as any)?.response?.status === 403) {
        message = "Access denied - insufficient permissions";
      } else if ((error as any)?.response?.status === 404) {
        message = "Resource not found";
      } else if ((error as any)?.response?.data?.message) {
        message = (error as any).response.data.message;
      }

      setState({
        data: null,
        loading: false,
        error: message,
      });
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return { ...state, refetch: fetchData };
}

