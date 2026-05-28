import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/src/store/auth-store";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";

type AuthGaurdProps = PropsWithChildren;

const DISABLE_AUTH_GUARD = true;

export function AuthGaurd({ children }: AuthGaurdProps) {
  console.log("[LOG] AuthGaurd rendering");
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const { _hasHydrated, accessToken, refreshToken } = useAuth((state) => state);
  const [rootSegment] = useSegments();

  useEffect(() => {
    if (DISABLE_AUTH_GUARD) {
      return;
    }

    if (!_hasHydrated || !rootNavigationState?.key) {
      return;
    }

    console.log("[LOG] auth state changed");
    const isAppRoute = rootSegment === "(app)";

    const isLoggedIn: boolean =
      accessToken !== undefined && refreshToken !== undefined;
    console.log(isLoggedIn, accessToken, refreshToken);
    if (!isLoggedIn && isAppRoute) {
      console.log("[LOG] redirecting to main");
      router.replace("/");
    } else if (isLoggedIn && !isAppRoute) {
      console.log("[LOG] redirecting to home");
      router.replace("/(app)/(tabs)/home");
    }
  }, [
    accessToken,
    refreshToken,
    _hasHydrated,
    rootNavigationState?.key,
    rootSegment,
    router,
  ]);

  return <>{children}</>;
}
