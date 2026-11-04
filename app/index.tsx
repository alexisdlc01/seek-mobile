import { Redirect } from "expo-router";
import { useAuth } from "@/src/store/auth-store";

export default function Index() {
  const hasHydrated = useAuth((state) => state._hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  return <Redirect href="/(app)/(tabs)/map" />;
}
