import apiClient from "@/api/apiClient";
import { useState, useEffect } from "react";


interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(endpoint: string): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const response = await apiClient.get(endpoint);
        console.log("API RESPONSE:", response.data);

        setState({ data: response.data, loading: false, error: null });
      } catch (error: unknown) {
        let message = "Failed to fetch data";

        if (error instanceof Error) {
          message = error.message;
        }

        setState({
          data: null,
          loading: false,
          error: message,
        });
      }
    };

    fetchData();
  }, [endpoint]);

  return state;
}

