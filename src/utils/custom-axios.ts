import axios, { AxiosError, AxiosRequestConfig, isCancel } from "axios";
import { useAuth } from "@/src/store/auth-store";
import { ErrorDto } from "../api/seek-api/model";

export type ErrorType = AxiosError<ErrorDto>;

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: {
    platform: "mobile",
  },
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const { _hasHydrated, accessToken } = useAuth.getState();
  if (!_hasHydrated) {
    console.error("[ERROR] attempt to access auth state before hydration");
    return config;
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log("[LOG] starting request");
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (resp) => {
    console.log("[LOG] request successful", resp.status);
    return resp;
  },
  async (error) => {
    if (isCancel(error)) {
      console.log("[LOG] request canceled", error.config?.url);
      throw error;
    }

    const { config, response, message } = error as ErrorType;
    console.error(
      "[ERROR] request failed",
      config?.url,
      response?.data.message ?? message,
    );

    const status = response?.status;
    if (status !== 401) {
      throw error;
    }

    console.log("[LOG] authentication error, attempting refresh");
    try {
      const refreshToken = useAuth.getState().refreshToken;
      const { data } = await axios.post<{
        access_token: string;
        refresh_token: string;
      }>(
        `${BASE_URL}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            mobile: true,
          },
        },
      );

      useAuth.getState().login({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      console.log("[LOG] refresh successful");
    } catch {
      console.log("[LOG] refresh failed, logging out");
      useAuth.getState().logout();
    }
  },
);

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return await AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data);
};
