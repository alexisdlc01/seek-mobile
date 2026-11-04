import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { Stack, useSegments } from "expo-router";

const PROTECTED_SEGMENTS = new Set([
  "application-successful",
  "chat",
  "edit-basic-information",
  "personal-info",
]);
const PUBLIC_SETTINGS_SEGMENTS = new Set([
  "privacy-policy",
  "terms-of-service",
]);

export default function Layout() {
  const segments = useSegments() as string[];
  const isSettingsRoute = segments.includes("settings");
  const isPublicSettingsRoute = segments.some((segment) =>
    PUBLIC_SETTINGS_SEGMENTS.has(segment),
  );
  const requiresAuthentication =
    segments.some((segment) => PROTECTED_SEGMENTS.has(segment)) ||
    (isSettingsRoute && !isPublicSettingsRoute);

  const stack = (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 260,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        contentStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="filters"
        options={{
          gestureEnabled: false,
          fullScreenGestureEnabled: false,
        }}
      />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="location/[id]" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="edit-basic-information" />
      <Stack.Screen name="legal" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="application-successful" />
    </Stack>
  );

  if (!requiresAuthentication) return stack;

  return (
    <AuthRequiredScreen
      title="Sign up to continue"
      description="This part of Seek is connected to your account. Create one to continue, or return to browse available homes."
    >
      {stack}
    </AuthRequiredScreen>
  );
}
