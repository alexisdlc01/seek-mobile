import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import {
  ClipboardListIcon,
  HouseIcon,
  InboxIcon,
  MapIcon,
  UserRoundIcon,
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
          title: "Search",
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
      {/* Search space: Search, Applied. My home space: My home (rent plan, deposit, bills, contract are opened from it). */}
      <Tabs.Screen
        name="my-home"
        options={{
          title: "My home",
          tabBarIcon: ({ color }) => <HouseIcon size={24} color={color} />,
        }}
      />
      {/* Always visible, in both spaces. */}
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => <InboxIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserRoundIcon size={24} color={color} />,
        }}
      />
      {/* Reached from My home ("Rent plan" button), not from the tab bar. */}
      <Tabs.Screen name="rent" options={{ href: null }} />
      {/* Reached from the map (Seek AI search bar, profile button), not from the tab bar. */}
      <Tabs.Screen name="seek-ai" options={{ href: null }} />
      <Tabs.Screen name="passport" options={{ href: null }} />
      <Tabs.Screen name="messages" options={{ href: null }} />
      <Tabs.Screen name="saved-listings" options={{ href: null }} />
    </Tabs>
  );
}
