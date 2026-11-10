import {
  ProfileScreen,
  useProfileTypography,
} from "@/components/custom/profile-screen";
import { Loader } from "@/components/custom/loader";
import { useFlagsControllerFindOne } from "@/src/api/seek-api/flags";
import { Text } from "@/components/ui/text";
import { PROFILE_LAYOUT } from "@/constants/design";
import type { SeekColors } from "@/constants/seek-theme";
import { useThemedStyles } from "@/hooks/use-seek-theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FlagStatusPill, flagDate } from "../previous-flags";

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
  const { flag: id } = useLocalSearchParams<{ flag: string }>();
  const { data: flag, isLoading, isError, error } = useFlagsControllerFindOne(id);

  return (
    <ProfileScreen title="Flag Details">
      <Loader isLoading={isLoading}>
        {isError || !flag ? (
          <Text style={profileTypography.body}>
            {error?.response?.status === 404
              ? "This flag could not be found."
              : "We could not load this flag. Please try again later."}
          </Text>
        ) : (
          <>
            <View style={styles.centered}>
              <FlagStatusPill status={flag.status} large />
            </View>

            <View style={styles.card}>
              <DetailRow label="Flag ID" value={flag._id} />
              <View style={styles.divider} />
              <DetailRow label="Date submitted" value={flagDate(flag.createdAt)} />
              <View style={styles.divider} />
              <DetailRow label="Category" value={flag.category.replace(/_/g, " ").toLowerCase()} />
              {flag.resolutionDate ? (
                <>
                  <View style={styles.divider} />
                  <DetailRow
                    label="Resolution date"
                    value={new Date(flag.resolutionDate).toLocaleDateString(
                      "en-GB",
                    )}
                  />
                </>
              ) : null}
            </View>

            <View style={styles.card}>
              <Text style={profileTypography.sectionTitle}>Your Report</Text>
              <Text style={profileTypography.body}>{flag.text}</Text>
            </View>

            {flag.supportResponse ? (
              <View style={styles.card}>
                <Text style={profileTypography.sectionTitle}>Seek Support</Text>
                <Text style={profileTypography.body}>{flag.supportResponse}</Text>
              </View>
            ) : null}
          </>
        )}
      </Loader>
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
