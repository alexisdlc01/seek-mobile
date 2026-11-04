import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { HeartIcon, MessagesSquareIcon, MapIcon } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="map"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <MessagesSquareIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <MapIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved-listings"
        options={{
          title: "Saved Listings",
          tabBarIcon: ({ color }) => (
            <HeartIcon size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
