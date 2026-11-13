import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { ListingSummaryCard } from "@/components/seek/listing-summary-card";
import {
  Badge,
  ChatBubble,
  Composer,
  SeekButton,
  SeekScreen,
} from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAiControllerSearchChat } from "@/src/api/seek-api/ai";
import type {
  SearchChatListingDto,
  SearchFiltersDto,
} from "@/src/api/seek-api/model";
import { useAiMapStore } from "@/src/store/ai-map-store";
import { matchFromSummary } from "@/src/utils/listing-match";
import { errorMessage } from "@/src/utils/tenancy-view";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SparklesIcon } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SUGGESTIONS = [
  "4 beds near the university under £700, bills included",
  "2 bed flat in St Andrews from September",
  "Cheapest room with a garden",
];
// The API reads the last few turns; older ones add cost without helping.
const HISTORY_LIMIT = 10;
const CARDS_SHOWN = 3;

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  text: string;
  listings?: SearchChatListingDto[];
  suggestions?: string[];
  filters?: SearchFiltersDto;
  relaxed?: string[];
  failed?: boolean;
};

export default function SeekAiScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to use Seek search"
      description="Describe the home you want and Seek search finds matches. Browse the map without an account, or sign in to chat."
    >
      <SeekAiChat />
    </AuthRequiredScreen>
  );
}

function filterChips(filters?: SearchFiltersDto): string[] {
  if (!filters) return [];
  return [
    filters.city,
    filters.nearUniversity ? `Near ${filters.nearUniversity}` : null,
    filters.minBedrooms ? `${filters.minBedrooms}+ beds` : null,
    filters.maxRent ? `Up to £${filters.maxRent}` : null,
    filters.billsIncluded ? "Bills included" : null,
    filters.moveIn ? `From ${filters.moveIn}` : null,
  ].filter((chip): chip is string => Boolean(chip));
}

function SeekAiChat() {
  const colors = useSeekTheme();
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const showOnMap = useAiMapStore((state) => state.show);
  const { mutate, isPending, data: last } = useAiControllerSearchChat();
  const name = last?.source === "ai" ? "Seek AI" : "Seek search";
  const [items, setItems] = useState<ChatItem[]>([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const handledQuery = useRef<string | undefined>(undefined);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || isPending) return;
      const userItem: ChatItem = { id: `u${Date.now()}`, role: "user", text };
      const history = [...items, userItem].filter((item) => !item.failed);
      setItems((current) => [...current, userItem]);
      setDraft("");
      mutate(
        {
          data: {
            messages: history
              .slice(-HISTORY_LIMIT)
              .map((item) => ({ role: item.role, content: item.text })),
          },
        },
        {
          onSuccess(response) {
            setItems((current) => [
              ...current,
              {
                id: `a${Date.now()}`,
                role: "assistant",
                text: response.reply,
                listings: response.listings,
                filters: response.filters,
                relaxed: response.relaxed,
                suggestions: response.suggestions,
              },
            ]);
          },
          onError(error) {
            setItems((current) => [
              ...current,
              {
                id: `e${Date.now()}`,
                role: "assistant",
                text: errorMessage(error, "I couldn't search just now. Please try again."),
                failed: true,
              },
            ]);
          },
        },
      );
    },
    [isPending, items, mutate],
  );

  // A question typed in the Find search bar arrives as ?q=...
  useEffect(() => {
    if (!q) {
      handledQuery.current = undefined;
      return;
    }
    if (handledQuery.current === q) return;
    handledQuery.current = q;
    send(q);
    router.setParams({ q: undefined });
  }, [q, router, send]);

  const openMap = (listings: SearchChatListingDto[]) => {
    showOnMap(listings);
    router.navigate("/(app)/(tabs)/map");
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SeekScreen
        title={name}
        subtitle="Describe the home you want"
        scroll={false}
        contentStyle={styles.noPadding}
        headerLeft={
          <View
            style={[styles.logo, { backgroundColor: colors.isDark ? colors.surfaceAlt : colors.accent }]}
          >
            <SparklesIcon color={colors.isDark ? colors.accent : "#FFFFFF"} size={18} strokeWidth={2.2} />
          </View>
        }
        footer={
          <Composer
            label={`Message ${name}`}
            placeholder="Refine: closer, cheaper, en-suite…"
            value={draft}
            onChangeText={setDraft}
            onSend={() => send(draft)}
          />
        }
      >
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.thread}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          <ChatBubble>
            Tell me about your group, budget, area and move-in date, and I&apos;ll
            find homes that fit.
          </ChatBubble>
          {items.length === 0 ? (
            <View style={styles.chips}>
              {SUGGESTIONS.map((suggestion) => (
                <Pressable
                  key={suggestion}
                  accessibilityRole="button"
                  onPress={() => send(suggestion)}
                  style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.accent }]}
                >
                  <Text style={[styles.chipText, { color: colors.text }]}>{suggestion}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          {items.map((item, index) => (
            <View key={item.id} style={styles.turn}>
              <ChatBubble mine={item.role === "user"}>{item.text}</ChatBubble>
              {item.role === "assistant" && !item.failed ? (
                <AssistantResults
                  item={item}
                  onOpen={(id) => router.push(`/(app)/location/${id}/details`)}
                  onShowOnMap={openMap}
                />
              ) : null}
              {index === items.length - 1 && !isPending && item.suggestions?.length ? (
                <View style={styles.chips}>
                  {item.suggestions.map((suggestion) => (
                    <Pressable
                      key={suggestion}
                      accessibilityRole="button"
                      onPress={() => send(suggestion)}
                      style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.accent }]}
                    >
                      <Text style={[styles.chipText, { color: colors.text }]}>{suggestion}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
          {isPending ? (
            <View style={styles.typing} accessibilityRole="progressbar" accessibilityLabel={`${name} is searching`}>
              <ActivityIndicator color={colors.accent} />
              <Text style={[styles.typingText, { color: colors.mutedText }]}>Searching…</Text>
            </View>
          ) : null}
        </ScrollView>
      </SeekScreen>
    </KeyboardAvoidingView>
  );
}

function AssistantResults({
  item,
  onOpen,
  onShowOnMap,
}: {
  item: ChatItem;
  onOpen: (id: string) => void;
  onShowOnMap: (listings: SearchChatListingDto[]) => void;
}) {
  const colors = useSeekTheme();
  const router = useRouter();
  const listings = item.listings ?? [];
  const chips = filterChips(item.filters);
  // The Apply screen holds the viewing slot and books it once the application is sent.
  const apply = (id: string) =>
    router.push({ pathname: "/(app)/apply", params: { listingId: id } });
  return (
    <View style={styles.results}>
      {chips.length > 0 ? (
        <View style={styles.chipRow}>
          {chips.map((chip) => (
            <Badge key={chip} label={chip} tone="info" />
          ))}
        </View>
      ) : null}
      {item.relaxed && item.relaxed.length > 0 ? (
        <Text style={[styles.note, { color: colors.mutedText }]}>
          Nothing matched everything, so I loosened: {item.relaxed.join(", ")}.
        </Text>
      ) : null}
      {listings.slice(0, CARDS_SHOWN).map((listing) => {
        // maxRent is per person, like rentPerPerson.
        const under =
          item.filters?.maxRent && listing.rentPerPerson != null
            ? item.filters.maxRent - listing.rentPerPerson
            : 0;
        return (
          <View key={listing.id} style={styles.results}>
            <ListingSummaryCard
              listing={listing}
              onPress={() => onOpen(listing.id)}
              match={matchFromSummary(listing)}
              onApply={() => apply(listing.id)}
              onBookViewing={() => apply(listing.id)}
            />
            {listing.checks.map((check) => (
              <Text
                key={check.text}
                style={[styles.note, { color: check.kind === "pass" ? colors.success : colors.warning }]}
              >
                {check.kind === "pass" ? "✓" : "!"} {check.text}
              </Text>
            ))}
            {under > 0 ? (
              <Text style={[styles.note, { color: colors.success }]}>£{under} under budget</Text>
            ) : null}
          </View>
        );
      })}
      {listings.length > CARDS_SHOWN ? (
        <Text style={[styles.note, { color: colors.mutedText }]}>
          +{listings.length - CARDS_SHOWN} more on the map
        </Text>
      ) : null}
      {listings.length > 0 ? (
        <SeekButton
          label="Show on map"
          variant="secondary"
          onPress={() => onShowOnMap(listings)}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  noPadding: { padding: 0, gap: 0, paddingBottom: 0 },
  thread: { padding: 16, gap: 14, paddingBottom: 24 },
  turn: { gap: 10 },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  chips: { gap: 8, alignItems: "flex-start" },
  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
  },
  chipText: { fontSize: 13, fontWeight: "500" },
  results: { gap: 10 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  note: { fontSize: 13, lineHeight: 18 },
  typing: { flexDirection: "row", alignItems: "center", gap: 8 },
  typingText: { fontSize: 13 },
});
