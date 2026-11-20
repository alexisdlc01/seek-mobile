import "@/global.css";
import { Slot, SplashScreen, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { forgetPushToken, hrefForPushResponse, registerForPush } from "@/src/utils/push";
import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { getAuthControllerCurrentUserQueryOptions } from "@/src/api/seek-api/auth";
import { useEffect } from "react";
import { useAuth } from "@/src/store/auth-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
export { ErrorBoundary } from "expo-router";

export const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
axios.defaults.headers["platform"] = "mobile";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // control the splash screen
  const _hasHydrated = useAuth((state) => state._hasHydrated);
  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hide();
    }
  }, [_hasHydrated]);

  // push: register once per session, then route taps (warm + cold start)
  const router = useRouter();
  const signedIn = useAuth((state) => Boolean(state.accessToken));
  useEffect(() => {
    if (!_hasHydrated) return;
    if (signedIn) {
      // Landlords are blocked on mobile: don't register their device for push.
      void queryClient
        .fetchQuery(getAuthControllerCurrentUserQueryOptions())
        .then((me) => (me.role === "STUDENT" ? registerForPush() : undefined))
        .catch(() => {});
    }
    else forgetPushToken();
  }, [_hasHydrated, signedIn]);
  useEffect(() => {
    if (!_hasHydrated) return;
    const open = (response: Notifications.NotificationResponse) => router.push(hrefForPushResponse(response));
    void Notifications.getLastNotificationResponseAsync().then((r) => r && open(r)).catch(() => {});
    const sub = Notifications.addNotificationResponseReceivedListener(open);
    return () => sub.remove();
  }, [_hasHydrated, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorScheme ?? "light"}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
