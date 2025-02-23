import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiError {
  error?: string;
  message?: string;
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

  const callApi = async<D=unknown> (
    url: string,
    method: HttpMethod,
    data?: D,
    config?: AxiosRequestConfig
  ):Promise<T | undefined> => {
    setApiState((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response: AxiosResponse<T> = await AxiosApi<T>({ method, url, data, ...config });
      setApiState({ data: response.data, loading: false, error: undefined });
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error("Error :", error);
      setApiState({
        data: undefined,
        loading: false,
        error: {
          error: axiosError.response?.data?.error || "Unknown Error",
          message: axiosError.response?.data?.message || "Something went wrong!",
        },
      });
      return undefined
    }
  };

  return { ...apiState, callApi };
}

export default useApiRequest;
