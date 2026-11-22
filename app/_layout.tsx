import "@/global.css";
import { Slot, SplashScreen, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { forgetPushToken, hrefForPushResponse, registerForPush } from "@/src/utils/push";
import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import axios from "axios";
import { getAuthControllerCurrentUserQueryOptions } from "@/src/api/seek-api/auth";
import { notificationsControllerMarkRead } from "@/src/api/seek-api/notifications";
import { invalidateHomeQueries } from "@/hooks/use-active-tenancy";
import { useEffect } from "react";
import { useAuth } from "@/src/store/auth-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppState, useColorScheme } from "react-native";
export { ErrorBoundary } from "expo-router";

export const queryClient = new QueryClient();

// React Query's focus detection relies on the browser; in React Native, tie it to the app state instead.
AppState.addEventListener("change", (state) => focusManager.setFocused(state === "active"));

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
    if (!signedIn) {
      forgetPushToken();
      return;
    }
    const register = () =>
      // Landlords are blocked on mobile: don't register their device for push.
      void queryClient
        .fetchQuery(getAuthControllerCurrentUserQueryOptions())
        .then((me) => (me.role === "STUDENT" ? registerForPush() : undefined))
        .catch(() => {});
    register();
    // Retry on foreground (offline at launch, permission granted later); registerForPush no-ops once registered.
    const sub = AppState.addEventListener("change", (state) => state === "active" && register());
    return () => sub.remove();
  }, [_hasHydrated, signedIn]);
  useEffect(() => {
    if (!_hasHydrated) return;
    const open = (response: Notifications.NotificationResponse) => {
      router.push(hrefForPushResponse(response));
      const id = response.notification.request.content.data?.notificationId;
      if (typeof id === "string") {
        void notificationsControllerMarkRead(id).then(() => invalidateHomeQueries(queryClient)).catch(() => {});
      }
    };
    void Notifications.getLastNotificationResponseAsync().then((r) => r && open(r)).catch(() => {});
    const sub = Notifications.addNotificationResponseReceivedListener(open);
    // Push received while the app is open: refresh the notifications list and unread count.
    const recv = Notifications.addNotificationReceivedListener(() => void invalidateHomeQueries(queryClient));
    return () => {
      sub.remove();
      recv.remove();
    };
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
