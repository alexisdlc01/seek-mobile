import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/src/store/auth-store";
import { useRouter } from "expo-router";

type AuthGaurdProps = PropsWithChildren;

export function AuthGaurd({ children }: AuthGaurdProps) {
  const router = useRouter();
  const hasHydrated = useAuth((state) => state._hasHydrated);
  const isLoggedIn = useAuth(
    (state) => Boolean(state.accessToken) && Boolean(state.refreshToken),
  );

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isLoggedIn) {
      router.replace("/(auth)/login");
    }
  }, [hasHydrated, isLoggedIn, router]);

  if (!hasHydrated || !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
