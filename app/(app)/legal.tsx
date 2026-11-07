import {
  ProfileActionRow,
  ProfileScreen,
} from "@/components/custom/profile-screen";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useRouter } from "expo-router";
import { FileCheck2Icon, ShieldCheckIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function LegalScreen() {
  const colors = useSeekTheme();
  const router = useRouter();
  const iconProps = {
    color: colors.accent,
    size: 22,
    strokeWidth: 2,
  };

  return (
    <ProfileScreen title="Legal" scroll={false}>
      <View style={{ gap: 12 }}>
        <ProfileActionRow
          title="Privacy Policy"
          icon={<ShieldCheckIcon {...iconProps} />}
          onPress={() => router.navigate("/(app)/settings/privacy-policy")}
        />
        <ProfileActionRow
          title="Terms of Service"
          icon={<FileCheck2Icon {...iconProps} />}
          onPress={() => router.navigate("/(app)/settings/terms-of-service")}
        />
      </View>
    </ProfileScreen>
  );
}
