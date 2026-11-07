import { Card, SeekButton } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { aiControllerAdvice } from "@/src/api/seek-api/ai";
import type { AdviceRequestDtoTopic } from "@/src/api/seek-api/model";
import { useQuery } from "@tanstack/react-query";
import { useRouter, type Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { SparklesIcon } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

/** The API's in-app paths are website routes; these are their screens in the app. */
const ROUTE_FOR_PATH: Record<string, Href> = {
  "/contracts": "/(app)/contract",
  "/rent": "/(app)/(tabs)/rent",
  "/inbox": "/(app)/(tabs)/inbox",
  "/connectors": "/(app)/connected-email",
  "/student/home": "/(app)/(tabs)/my-home",
  "/student/home/rent": "/(app)/(tabs)/rent",
  "/student/home/deposit": "/(app)/deposit",
  "/student/find": "/(app)/(tabs)/map",
  "/student/rent": "/(app)/(tabs)/rent",
  "/student/inbox": "/(app)/(tabs)/inbox",
  "/student/contracts": "/(app)/contract",
  "/student/connectors": "/(app)/connected-email",
  "/student/profile": "/(app)/(tabs)/passport",
};

type AdviceTarget = { kind: "web"; url: string } | { kind: "route"; href: Href };

/** Web links open in the in-app browser; website paths map to an app screen. Unknown paths are dropped. */
export function resolveAdviceLink(link: string): AdviceTarget | null {
  if (/^https?:\/\//i.test(link)) return { kind: "web", url: link };
  const path = link.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  const href = ROUTE_FOR_PATH[path];
  return href ? { kind: "route", href } : null;
}

/**
 * Seek AI advice for one topic (POST /ai/advice). Cached for 10 minutes so
 * reopening a screen does not spend another model call. Each action opens its
 * app screen or the web page it points to.
 */
export function AdviceCard({
  topic,
  tenancyId,
  threadId,
  applicationId,
  heading = "Seek AI",
}: {
  topic: AdviceRequestDtoTopic;
  tenancyId?: string;
  /** For topic "inbox": the thread to summarise. */
  threadId?: string;
  /** For topic "application": the household application to assess. */
  applicationId?: string;
  heading?: string;
}) {
  const colors = useSeekTheme();
  const router = useRouter();
  const query = useQuery({
    queryKey: ["ai-advice", topic, tenancyId, threadId, applicationId],
    queryFn: () => aiControllerAdvice({ topic, tenancyId, threadId, applicationId }),
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
  const links = (query.data?.actions ?? []).flatMap((action) => {
    const target = resolveAdviceLink(action.link);
    return target ? [{ ...action, target }] : [];
  });

  return (
    <Card tone="hero">
      <View style={styles.title}>
        <SparklesIcon color={colors.onHero} size={18} />
        <Text style={[styles.titleText, { color: colors.onHero }]}>{heading}</Text>
      </View>
      {query.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.onHero} />
          <Text style={[styles.body, { color: colors.heroMuted }]}>Seek AI is reading your tenancy…</Text>
        </View>
      ) : query.isError ? (
        <>
          <Text style={[styles.body, { color: colors.heroMuted }]}>
            Seek AI isn&apos;t available right now. Try again in a minute.
          </Text>
          <SeekButton label="Try again" variant="light" compact onPress={() => query.refetch()} style={styles.self} />
        </>
      ) : query.data ? (
        <>
          <Text style={[styles.adviceTitle, { color: colors.onHero }]}>{query.data.title}</Text>
          <Text style={[styles.body, { color: colors.heroMuted }]}>{query.data.advice}</Text>
          {links.length > 0 ? (
            <View style={styles.actions}>
              {links.map((action) => (
                <SeekButton
                  key={action.link}
                  label={action.label}
                  variant="outlineOnHero"
                  compact
                  onPress={() =>
                    action.target.kind === "web"
                      ? void WebBrowser.openBrowserAsync(action.target.url)
                      : router.push(action.target.href)
                  }
                />
              ))}
            </View>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { flexDirection: "row", alignItems: "center", gap: 8 },
  titleText: { flex: 1, fontSize: 15, fontWeight: "700" },
  adviceTitle: { fontSize: 15, fontWeight: "700" },
  body: { fontSize: 13.5, lineHeight: 20 },
  loading: { flexDirection: "row", alignItems: "center", gap: 10 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  self: { alignSelf: "flex-start" },
});
