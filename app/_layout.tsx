import "@/global.css";
import { Slot, SplashScreen } from "expo-router";
import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
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

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorScheme ?? "dark"}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
