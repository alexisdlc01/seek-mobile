import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SecureStorage } from "./persist/secure";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

interface AuthState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  _hasHydrated: boolean;
  login: (tokens: Tokens) => void;
  logout: () => void;
  setHydrated: () => void;
}

function isPlausibleJwt(token: string | undefined): boolean {
  return Boolean(token && token.split(".").length === 3);
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: undefined,
      refreshToken: undefined,
      _hasHydrated: false,
      login: (tokens) => {
        return set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },
      logout: () => set({ accessToken: undefined, refreshToken: undefined }),
      setHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => SecureStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage() {
        return (state, error) => {
          const hasAnyToken = Boolean(state?.accessToken || state?.refreshToken);
          const hasUsableTokenPair =
            isPlausibleJwt(state?.accessToken) &&
            isPlausibleJwt(state?.refreshToken);

          if (hasAnyToken && !hasUsableTokenPair) {
            state?.logout();
          }

          state?.setHydrated();
          if (error) {
            console.error(
              "[ERROR] error rehydrating auth state from storage:",
              error,
            );
          }
        };
      },
    },
  ),
);
