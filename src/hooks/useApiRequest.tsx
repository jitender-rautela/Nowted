import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiError {
  error?: string;
  message?: string;
  status?: number;
}

interface ApiState<T> {
  data?: T;
  loading: boolean;
  error?: ApiError | null;
}

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function useApiRequest<T = unknown>() {
  const [apiState, setApiState] = useState<ApiState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

  const callApi = async <D = unknown>(
    url: string,
    method: HttpMethod,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> => {
    setApiState((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response: AxiosResponse<T> = await AxiosApi<T>({ method, url, data, ...config });
      setApiState({ data: response.data, loading: false, error: undefined });
      return response.data;
    } catch (error) {
      let formattedError: ApiError = {
        error: "Unknown Error",
        message: "Something went wrong!",
        status: 500,
      };

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;

        formattedError = {
          error: axiosError.response?.data?.error || axiosError.message || "API Error",
          message: axiosError.response?.data?.message || "An error occurred",
          status: axiosError.response?.status || 500,
        };
      } else if (error instanceof Error) {
        // Handle other error types (e.g., network issues)
        formattedError = {
          error: "Network Error",
          message: error.message,
          status: 0,
        };
      }

      console.error("API Error:", formattedError);
      setApiState({ data: undefined, loading: false, error: formattedError });
      return undefined;
    }
  };

  return { ...apiState, callApi };
}

export default useApiRequest;
