import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  isCancel,
} from "axios";
import { useAuth } from "@/src/store/auth-store";
import { queryClient } from "@/app/_layout";
import { ErrorDto } from "../api/seek-api/model";

export type ErrorType<TError = ErrorDto> = AxiosError<TError>;

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: {
    platform: "mobile",
  },
});

type TokenPair = {
  access_token: string;
  refresh_token: string;
};

type RetryableRequest = AxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<TokenPair> | null = null;

const AUTH_REQUESTS_THAT_MUST_NOT_REFRESH = new Set([
  "/auth/login",
  "/auth/signup",
  "/auth/verify-email",
  "/auth/resend-otp",
  "/auth/forgot-password",
  "/auth/confirmPasswordReset",
  "/auth/refresh",
]);

async function refreshSession(refreshToken: string): Promise<TokenPair> {
  const { data } = await axios.post<TokenPair>(
    `${BASE_URL}/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        platform: "mobile",
      },
    },
  );

  if (useAuth.getState().refreshToken !== refreshToken) {
    throw new Error("The authenticated session changed while refreshing.");
  }

  useAuth.getState().login({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });

  return data;
}

function getRefreshPromise(refreshToken: string): Promise<TokenPair> {
  if (!refreshPromise) {
    refreshPromise = refreshSession(refreshToken).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const { accessToken } = useAuth.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isCancel(error)) {
      throw error;
    }

    const { code, config, response, message } = error as ErrorType;
    console.error(
      "[ERROR] request failed",
      `${config?.baseURL ?? ""}${config?.url ?? ""}`,
      response?.data?.message ?? `${code ?? "NETWORK_ERROR"}: ${message}`,
    );

    const status = response?.status;
    const originalRequest = config as RetryableRequest | undefined;
    const requestPath = originalRequest?.url?.split("?")[0];
    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      (requestPath && AUTH_REQUESTS_THAT_MUST_NOT_REFRESH.has(requestPath))
    ) {
      throw error;
    }
    originalRequest._retry = true;

    const refreshToken = useAuth.getState().refreshToken;
    if (!refreshToken) {
      throw error;
    }

    try {
      const data = await getRefreshPromise(refreshToken);
      originalRequest.headers = AxiosHeaders.from(
        originalRequest.headers as Parameters<typeof AxiosHeaders.from>[0],
      );
      originalRequest.headers.set(
        "Authorization",
        `Bearer ${data.access_token}`,
      );
      return AXIOS_INSTANCE(originalRequest);
    } catch (refreshError) {
      if (useAuth.getState().refreshToken === refreshToken) {
        useAuth.getState().logout();
        queryClient.clear();
      }
      throw refreshError;
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
