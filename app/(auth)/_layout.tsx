import { useAuth } from "@/src/store/auth-store";
import { useSignupState } from "@/src/store/signup-store";
import { afterAuthHref, useAuthRedirect } from "@/src/store/auth-redirect-store";
import { Redirect, Slot, useSegments } from "expo-router";
import { useEffect } from "react";

export default function Base() {
  const segments = useSegments() as string[];
  const hasHydrated = useAuth((state) => state._hasHydrated);
  const isLoggedIn = useAuth(
    (state) => Boolean(state.accessToken) && Boolean(state.refreshToken),
  );
  const pendingHref = useAuthRedirect((state) => state.pendingHref);
  // Cleared once the user has really left the auth stack signed in (not on a dev double-mount).
  useEffect(
    () => () => {
      if (useAuth.getState().accessToken) {
        useAuthRedirect.getState().setPendingHref(null);
      }
    },
    [],
  );
  const hasPendingSignup = useSignupState(
    (state) => Boolean(state.data.userId),
  );
  const isSignupProfileCompletion =
    segments.includes("signup") && segments.includes("profile-photo");
  const isResetConfirmation = segments.includes("reset-password");

  if (!hasHydrated) {
    return null;
  }

  if (
    isLoggedIn &&
    !isResetConfirmation &&
    !(isSignupProfileCompletion && hasPendingSignup)
  ) {
    return <Redirect href={afterAuthHref(pendingHref)} />;
  }

  return <Slot initialRouteName="login" />;
}
