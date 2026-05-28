import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="filters" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="location" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
