import { Card, SeekButton, SeekScreen } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useRouter } from "expo-router";
import { CheckCircle2Icon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ApplicationSuccessScreen() {
  const colors = useSeekTheme();
  const router = useRouter();

  return (
    <SeekScreen
      scroll={false}
      contentStyle={styles.content}
      footer={
        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.line }]}>
          <SeekButton label="Open Inbox" onPress={() => router.replace("/(app)/(tabs)/inbox")} />
          <SeekButton
            label="Keep looking"
            variant="secondary"
            onPress={() => router.replace("/(app)/(tabs)/map")}
          />
        </View>
      }
    >
      <View style={[styles.badge, { backgroundColor: colors.successBg }]}>
        <CheckCircle2Icon color={colors.success} size={44} strokeWidth={2} />
      </View>
      <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>
        Application sent
      </Text>
      <Text style={[styles.body, { color: colors.mutedText }]}>
        The landlord now has your household and your Seek Passport. You&apos;ll
        get a reply in your Inbox.
      </Text>
      <Card tone="tint" style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.onTint }]}>Shared for 14 days</Text>
        <Text style={[styles.cardBody, { color: colors.onTint }]}>
          Your documents are visible to the landlord for 14 days. Stop sharing any
          time in Profile, under Who can see this.
        </Text>
        <SeekButton
          label="Manage sharing"
          variant="secondary"
          compact
          onPress={() => router.replace("/(app)/(tabs)/passport")}
        />
      </Card>
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14, padding: 24 },
  badge: { width: 88, height: 88, borderRadius: 44, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  body: { fontSize: 15, lineHeight: 22, textAlign: "center" },
  card: { alignSelf: "stretch", alignItems: "flex-start" },
  cardTitle: { fontSize: 14.5, fontWeight: "700" },
  cardBody: { fontSize: 13, lineHeight: 19 },
  footer: { padding: 16, gap: 8, borderTopWidth: 1 },
});
