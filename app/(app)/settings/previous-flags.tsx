import {
  ProfileScreen,
  useProfileTypography,
} from "@/components/custom/profile-screen";
import { Text } from "@/components/ui/text";
import { PROFILE_LAYOUT } from "@/constants/design";
import type { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

type FlagRecord = {
  _id: string;
  status: string;
  date: string;
  description: string;
};

export function getFlagStatusPresentation(status: string, colors: SeekColors) {
  if (status === "RESOLVED" || status === "ACCOUNT_SUSPENDED") {
    return { label: "Resolved", color: colors.success };
  }
  if (status === "UNDER_REVIEW") {
    return { label: "Under Review", color: colors.review };
  }
  if (status === "NO_ACTION" || status === "NO_ACTION_TAKEN") {
    return { label: "No Action Taken", color: colors.noAction };
  }
  return { label: "Unknown", color: colors.mutedText };
}

export function FlagStatusPill({
  status,
  large = false,
}: {
  status: string;
  large?: boolean;
}) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const presentation = getFlagStatusPresentation(status, colors);
  return (
    <View
      style={[
        styles.statusPill,
        { borderColor: presentation.color },
        large && styles.largePill,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          { color: presentation.color },
          large && styles.largeStatusText,
        ]}
      >
        {presentation.label}
      </Text>
    </View>
  );
}

function FlagCard({ item }: { item: FlagRecord }) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const profileTypography = useProfileTypography();
  const router = useRouter();
  const presentation = getFlagStatusPresentation(item.status, colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${presentation.label} flag from ${item.date}`}
      onPress={() =>
        router.navigate(`/(app)/settings/${item._id}/flag-details`)
      }
      style={[styles.card, { borderColor: presentation.color }]}
    >
      <View style={styles.cardHeader}>
        <FlagStatusPill status={item.status} />
        <Text style={profileTypography.metadata}>{item.date}</Text>
      </View>
      <Text style={profileTypography.body}>{item.description}</Text>
    </Pressable>
  );
}

export default function PreviousFlagsScreen() {
  const styles = useThemedStyles(createStyles);
  const data: FlagRecord[] = [
    {
      _id: "1",
      status: "RESOLVED",
      date: "2023-01-01",
      description: "This is a description",
    },
    {
      _id: "2",
      status: "UNDER_REVIEW",
      date: "2023-01-02",
      description: "This is a description",
    },
    {
      _id: "3",
      status: "NO_ACTION_TAKEN",
      date: "2023-03-01",
      description: "This is a description",
    },
  ];

  return (
    <ProfileScreen title="Previous Flags" scroll={false}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <FlagCard item={item} />}
      />
    </ProfileScreen>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    list: {
      gap: 14,
      paddingBottom: 28,
    },
    card: {
      gap: 16,
      padding: 18,
      borderWidth: 1.5,
      borderRadius: PROFILE_LAYOUT.cardRadius,
      backgroundColor: "transparent",
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    statusPill: {
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 999,
      backgroundColor: "transparent",
    },
    largePill: {
      paddingHorizontal: 18,
      paddingVertical: 8,
    },
    statusText: {
      fontSize: 13,
      lineHeight: 17,
      fontWeight: "700",
    },
    largeStatusText: {
      fontSize: 16,
      lineHeight: 21,
    },
  });
