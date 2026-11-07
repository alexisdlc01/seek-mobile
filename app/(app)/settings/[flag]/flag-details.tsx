import {
  ProfileScreen,
  useProfileTypography,
} from "@/components/custom/profile-screen";
import { Text } from "@/components/ui/text";
import { PROFILE_LAYOUT } from "@/constants/design";
import type { SeekColors } from "@/constants/seek-theme";
import { useThemedStyles } from "@/hooks/use-seek-theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FlagStatusPill } from "../previous-flags";

function DetailRow({ label, value }: { label: string; value: string }) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function FlagDetailsScreen() {
  const styles = useThemedStyles(createStyles);
  const profileTypography = useProfileTypography();
  const { flag } = useLocalSearchParams<{ flag: string }>();

  return (
    <ProfileScreen title="Flag Details">
      <View style={styles.centered}>
        <FlagStatusPill status="RESOLVED" large />
      </View>

      <View style={styles.card}>
        <DetailRow label="Flag ID" value={flag ?? "—"} />
        <View style={styles.divider} />
        <DetailRow label="Date submitted" value="This is a description" />
        <View style={styles.divider} />
        <DetailRow label="Category" value="This is a description" />
        <View style={styles.divider} />
        <DetailRow label="Reported user" value="This is a description" />
        <View style={styles.divider} />
        <DetailRow label="Resolution date" value="This is a description" />
      </View>

      <View style={styles.card}>
        <Text style={profileTypography.sectionTitle}>Your Report</Text>
        <Text style={profileTypography.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper, nisl in tincidunt aliquet, lorem justo aliquam lectus,
          quis aliquam nisi nisl in nisi.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={profileTypography.sectionTitle}>
          Seek Support Response
        </Text>
        <Text style={profileTypography.body}>
          Thank you for reporting this incident. After reviewing the case and
          speaking with both parties, we have taken the appropriate action.
        </Text>
        <Text style={profileTypography.body}>
          We take flags seriously and appreciate your detailed report. Contact
          us if you need further assistance.
        </Text>
      </View>
    </ProfileScreen>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    centered: {
      alignItems: "center",
    },
    card: {
      gap: 14,
      padding: 18,
      borderWidth: 1.25,
      borderColor: colors.border,
      borderRadius: PROFILE_LAYOUT.cardRadius,
      backgroundColor: colors.surface,
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
    },
    detailLabel: {
      flex: 1,
      color: colors.mutedText,
      fontSize: 14,
      lineHeight: 20,
    },
    detailValue: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      textAlign: "right",
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.lineStrong,
    },
  });
