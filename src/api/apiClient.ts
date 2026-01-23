import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach Bearer token
apiClient.interceptors.request.use((config) => {
  // Check both 'accessToken' (new standard) and 'token' (legacy)
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    // 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          if (res.data.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
            originalConfig.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return apiClient.request(originalConfig);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Refresh failed, clear storage and redirect to login
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // 403 Forbidden - permission denied (don't retry)
    if (error.response?.status === 403) {
      console.warn("Access denied (403):", error.response.data?.message);
      return Promise.reject(error);
    }

    // 404 Not Found - endpoint mismatch (don't retry)
    if (error.response?.status === 404) {
      console.error("Endpoint not found (404):", originalConfig.url);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

/**
 * Fetch user by ID from /auth/:id
 * Used for credit fetching
 * Automatically includes Authorization header
 */
export const getUserById = (id: string) =>
  apiClient.get(`/auth/${id}`);
