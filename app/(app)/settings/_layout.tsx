import { useSeekTheme } from "@/hooks/use-seek-theme";
import { Stack } from "expo-router";

export default function StackLayout() {
  const colors = useSeekTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 260,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
