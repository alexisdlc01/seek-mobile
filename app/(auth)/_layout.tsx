import { useAuth } from "@/src/store/auth-store";
import { useSignupState } from "@/src/store/signup-store";
import { Redirect, Slot, useSegments } from "expo-router";

export default function Base() {
  const segments = useSegments() as string[];
  const hasHydrated = useAuth((state) => state._hasHydrated);
  const isLoggedIn = useAuth(
    (state) => Boolean(state.accessToken) && Boolean(state.refreshToken),
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
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return <Slot initialRouteName="login" />;
}
