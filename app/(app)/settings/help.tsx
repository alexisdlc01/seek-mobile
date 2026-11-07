import {
  ProfileActionRow,
  ProfileScreen,
} from "@/components/custom/profile-screen";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useRouter } from "expo-router";
import {
  FlagIcon,
  HistoryIcon,
  MessagesSquareIcon,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function HelpScreen() {
  const colors = useSeekTheme();
  const router = useRouter();
  const iconProps = {
    color: colors.accent,
    size: 22,
    strokeWidth: 2,
  };

  return (
    <ProfileScreen title="Help" scroll={false}>
      <View style={{ gap: 12 }}>
        <ProfileActionRow
          title="Contact"
          icon={<MessagesSquareIcon {...iconProps} />}
          onPress={() => router.navigate("/(app)/settings/contact")}
        />
        <ProfileActionRow
          title="Flag an Issue"
          icon={<FlagIcon {...iconProps} />}
          onPress={() => router.navigate("/(app)/settings/flag-issue")}
        />
        <ProfileActionRow
          title="Previous Flags"
          icon={<HistoryIcon {...iconProps} />}
          onPress={() => router.navigate("/(app)/settings/previous-flags")}
        />
      </View>
    </ProfileScreen>
  );
}
