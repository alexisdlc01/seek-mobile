import { SeekButton } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { errorMessage } from "@/src/utils/tenancy-view";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

/** Centered spinner for a screen or a card while data loads. */
export function LoadingState({ label = "Loading…" }: { label?: string }) {
  const colors = useSeekTheme();
  return (
    <View style={styles.center} accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator color={colors.accent} />
      <Text style={[styles.body, { color: colors.mutedText }]}>{label}</Text>
    </View>
  );
}

/** Error message with a retry button. */
export function ErrorState({
  error,
  onRetry,
  title = "Couldn't load this",
}: {
  error?: unknown;
  onRetry?: () => void;
  title?: string;
}) {
  const colors = useSeekTheme();
  return (
    <View style={styles.center}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.body, { color: colors.mutedText }]}>
        {errorMessage(error, "Check your connection and try again.")}
      </Text>
      {onRetry ? <SeekButton label="Try again" variant="tint" compact onPress={onRetry} /> : null}
    </View>
  );
}

export function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const colors = useSeekTheme();
  return (
    <View style={styles.center}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {body ? <Text style={[styles.body, { color: colors.mutedText }]}>{body}</Text> : null}
      {actionLabel && onAction ? (
        <SeekButton label={actionLabel} compact onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", gap: 10, paddingVertical: 32, paddingHorizontal: 16 },
  title: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  body: { fontSize: 13.5, lineHeight: 19, textAlign: "center" },
});
