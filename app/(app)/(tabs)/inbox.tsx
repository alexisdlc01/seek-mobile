import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Avatar, Card, Divider, SeekScreen } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useConnectorsControllerOverview } from "@/src/api/seek-api/connectors";
import { useInboxControllerThreads } from "@/src/api/seek-api/inbox";
import { useInboxPrefs } from "@/src/store/inbox-prefs-store";
import type {
  InboxControllerThreadsCategory,
  InboxThreadDto,
} from "@/src/api/seek-api/model";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ChevronRightIcon, MailIcon, UsersIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FILTERS: { label: string; category?: InboxControllerThreadsCategory }[] = [
  { label: "All" },
  { label: "Landlord", category: "LANDLORD" },
  { label: "Bills", category: "BILLS" },
  { label: "Household", category: "HOUSEHOLD" },
];

export default function InboxScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your inbox"
      description="Messages from landlords, your household and housing emails live here."
    >
      <Inbox />
    </AuthRequiredScreen>
  );
}

function Inbox() {
  const colors = useSeekTheme();
  const router = useRouter();
  const [filter, setFilter] = useState(0);
  const category = FILTERS[filter].category;
  const threads = useInboxControllerThreads(category ? { category } : undefined, {
    query: { placeholderData: keepPreviousData },
  });
  const hiddenEmailCategories = useInboxPrefs((state) => state.hiddenEmailCategories);
  const visibleThreads = (threads.data ?? []).filter(
    (thread) => !(thread.kind === "email" && hiddenEmailCategories.includes(thread.category)),
  );
  const connectors = useConnectorsControllerOverview();
  const connected = connectors.data?.connections.filter((c) => c.status === "CONNECTED") ?? [];

  const openThread = (thread: InboxThreadDto) => {
    // Seek-only conversations (household groups) keep their own chat screen.
    if (thread.kind === "seek" && !thread.channels.includes("email")) {
      router.push(`/(app)/chat/${thread.id.replace(/^seek-/, "")}`);
      return;
    }
    router.push({ pathname: "/(app)/thread", params: { id: thread.id } });
  };

  return (
    <SeekScreen title="Inbox" subtitle="Landlords, agents and housing contacts">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Manage connected email"
        onPress={() => router.push("/(app)/connected-email")}
        style={[styles.banner, { backgroundColor: colors.tint }]}
      >
        <MailIcon color={colors.onTint} size={18} />
        <Text style={[styles.bannerText, { color: colors.onTint }]}>
          {connected.length > 0
            ? `${connected.map((c) => c.label).join(" and ")} connected. Housing emails appear here.`
            : "Connect your email to see housing emails here."}
        </Text>
        <Text style={[styles.bannerAction, { color: colors.onTint }]}>
          {connected.length > 0 ? "Manage" : "Connect"}
        </Text>
      </Pressable>

      <View style={styles.filters}>
        {FILTERS.map((item, index) => {
          const selected = index === filter;
          return (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setFilter(index)}
              style={[
                styles.filter,
                {
                  backgroundColor: selected ? colors.primary : colors.surface,
                  borderColor: selected ? colors.primary : colors.lineStrong,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selected ? colors.onPrimary : colors.text },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {threads.isLoading ? (
        <LoadingState label="Loading your inbox…" />
      ) : threads.isError ? (
        <ErrorState error={threads.error} onRetry={() => void threads.refetch()} title="Couldn't load your inbox" />
      ) : visibleThreads.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          body={
            category
              ? "No conversations in this folder."
              : "Messages from landlords, your household and connected email show up here."
          }
        />
      ) : (
        <Card style={styles.list}>
          {visibleThreads.map((thread, index) => (
            <View key={thread.id}>
              {index > 0 ? <Divider /> : null}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open conversation with ${thread.name}`}
                onPress={() => openThread(thread)}
                style={styles.thread}
              >
                <Avatar
                  initials={thread.initials}
                  size={42}
                  tone={thread.category === "LANDLORD" ? "alt" : "alt2"}
                />
                <View style={styles.threadText}>
                  <View style={styles.threadTop}>
                    <Text
                      numberOfLines={1}
                      style={[styles.threadName, { color: colors.text }]}
                    >
                      {thread.name}
                    </Text>
                    <Text style={[styles.threadTime, { color: colors.mutedText }]}>
                      {thread.timeLabel}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={[styles.threadRole, { color: colors.mutedText }]}
                  >
                    {thread.sub}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.threadPreview,
                      { color: thread.unread ? colors.text : colors.mutedText },
                      thread.unread && styles.bold,
                    ]}
                  >
                    {thread.preview}
                  </Text>
                </View>
                {thread.unread ? (
                  <View style={[styles.dot, { backgroundColor: colors.accent }]} />
                ) : null}
              </Pressable>
            </View>
          ))}
        </Card>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Application groups"
        onPress={() => router.push("/(app)/(tabs)/messages")}
        style={[
          styles.group,
          { backgroundColor: colors.surface, borderColor: colors.line },
        ]}
      >
        <View style={[styles.groupIcon, { backgroundColor: colors.tint }]}>
          <UsersIcon color={colors.onTint} size={20} />
        </View>
        <View style={styles.threadText}>
          <Text style={[styles.threadName, { color: colors.text }]}>
            Application groups
          </Text>
          <Text style={[styles.threadRole, { color: colors.mutedText }]}>
            Chat with the people you apply with
          </Text>
        </View>
        <ChevronRightIcon color={colors.mutedText} size={20} />
      </Pressable>
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
  },
  bannerText: { flex: 1, fontSize: 12.5, lineHeight: 17 },
  bannerAction: { fontSize: 12.5, fontWeight: "700" },
  filters: { flexDirection: "row", gap: 8 },
  filter: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: { fontSize: 13, fontWeight: "600" },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  thread: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  threadText: { flex: 1, gap: 1 },
  threadTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 8,
  },
  threadName: { flex: 1, fontSize: 15, lineHeight: 20, fontWeight: "600" },
  threadTime: { fontSize: 12 },
  threadRole: { fontSize: 12, lineHeight: 16 },
  threadPreview: { fontSize: 13, lineHeight: 18, marginTop: 2 },
  bold: { fontWeight: "600" },
  dot: { width: 9, height: 9, borderRadius: 5 },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
