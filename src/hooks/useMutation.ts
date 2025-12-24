import { useState } from "react";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";

interface UseMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  successMsg?: string;
  errorMsg?: string;
}

export function useMutation(options: UseMutationOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    method: "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    data?: any
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;

      if (method === "POST") {
        response = await apiClient.post(endpoint, data);
      } else if (method === "PUT") {
        response = await apiClient.put(endpoint, data);
      } else if (method === "DELETE") {
        response = await apiClient.delete(endpoint);
      } else if (method === "PATCH") {
        response = await apiClient.patch(endpoint, data);
      }

      toast.success(options.successMsg || "Success! ✅");
      options.onSuccess?.(response?.data);
      return response?.data;

    } catch (err: any) {
      const message = err.response?.data?.message || options.errorMsg || "Error occurred";
      setError(message);
      toast.error(message);
      options.onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}