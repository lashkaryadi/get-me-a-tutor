import { useState } from "react";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";

interface UseApiWithToastOptions {
  loadingMsg?: string;
  successMsg?: string;
  errorMsg?: string;
}

export function useApiWithToast(options: UseApiWithToastOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    loadingMsg = "Processing...",
    successMsg = "Success! ✅",
    errorMsg = "Something went wrong ❌",
  } = options;

  const makeRequest = async (
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    data?: any
  ) => {
    setIsLoading(true);
    const toastId = toast.loading(loadingMsg);

    try {
      let response;

      if (method === "GET") {
        response = await apiClient.get(endpoint);
      } else if (method === "POST") {
        response = await apiClient.post(endpoint, data);
      } else if (method === "PUT") {
        response = await apiClient.put(endpoint, data);
      } else if (method === "DELETE") {
        response = await apiClient.delete(endpoint);
      } else if (method === "PATCH") {
        response = await apiClient.patch(endpoint, data);
      }

      toast.dismiss(toastId);
      toast.success(successMsg);
      return response?.data;

    } catch (error: any) {
      toast.dismiss(toastId);
      const message = error.response?.data?.message || errorMsg;
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { makeRequest, isLoading };
}