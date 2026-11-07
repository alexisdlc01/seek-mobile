import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import {
  ClipboardListIcon,
  HouseIcon,
  InboxIcon,
  MapIcon,
  WalletIcon,
} from "lucide-react-native";

export default function TabLayout() {
  const colors = useSeekTheme();

  return (
    <Tabs
      initialRouteName="map"
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.mutedText,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.line,
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <MapIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="applied"
        options={{
          title: "Applied",
          tabBarIcon: ({ color }) => <ClipboardListIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-home"
        options={{
          title: "My home",
          tabBarIcon: ({ color }) => <HouseIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => <InboxIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rent"
        options={{
          title: "Rent",
          tabBarIcon: ({ color }) => <WalletIcon size={24} color={color} />,
        }}
      />
      {/* Reached from the map (Seek AI search bar, profile button), not from the tab bar. */}
      <Tabs.Screen name="seek-ai" options={{ href: null }} />
      <Tabs.Screen name="passport" options={{ href: null }} />
      <Tabs.Screen name="messages" options={{ href: null }} />
      <Tabs.Screen name="saved-listings" options={{ href: null }} />
    </Tabs>
  );
}
