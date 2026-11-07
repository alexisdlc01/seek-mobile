import { Badge, SeekButton } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import type { SearchChatListingDto } from "@/src/api/seek-api/model";
import type { Match } from "@/src/utils/listing-match";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

/** Compact listing card for search results (Seek AI chat and the map sheet). */
export function ListingSummaryCard({
  listing,
  onPress,
  match,
  onApply,
  onBookViewing,
}: {
  listing: SearchChatListingDto;
  onPress: () => void;
  /** Match % and the reason line. */
  match?: Match;
  /** Shows an Apply button. */
  onApply?: () => void;
  /** Shows a Book viewing button. */
  onBookViewing?: () => void;
}) {
  const colors = useSeekTheme();
  const price = listing.rentPerPerson ?? listing.monthlyRent;
  const facts = [
    listing.bedrooms ? `${listing.bedrooms} bed` : null,
    listing.bathrooms ? `${listing.bathrooms} bath` : null,
    listing.postcode ?? listing.city,
  ].filter(Boolean);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${listing.title}`}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}
    >
      <View style={[styles.photo, { backgroundColor: colors.surfaceAlt }]}>
        {listing.photo ? (
          <Image source={{ uri: listing.photo }} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : null}
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
            {listing.title}
          </Text>
          {price != null ? (
            <Text style={[styles.price, { color: colors.text }]}>
              £{price}
              <Text style={[styles.per, { color: colors.mutedText }]}>
                {listing.rentPerPerson != null ? " pcm each" : " pcm"}
              </Text>
            </Text>
          ) : null}
        </View>
        <Text numberOfLines={1} style={[styles.facts, { color: colors.mutedText }]}>
          {facts.join(" · ")}
        </Text>
        {match ? (
          <View style={styles.matchRow}>
            <Badge label={`${match.percent}% match`} tone="info" />
            <Text numberOfLines={2} style={[styles.why, { color: colors.mutedText }]}>
              {match.why}
            </Text>
          </View>
        ) : null}
        {listing.billsIncluded ? <Badge label="Bills included" tone="success" /> : null}
        {onApply || onBookViewing ? (
          <View style={styles.actions}>
            {onApply ? <SeekButton label="Apply" compact onPress={onApply} accessibilityLabel={`Apply to ${listing.title}`} /> : null}
            {onBookViewing ? (
              <SeekButton
                label="Book viewing"
                compact
                variant="tint"
                onPress={onBookViewing}
                accessibilityLabel={`Book a viewing for ${listing.title}`}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, overflow: "hidden" },
  photo: { height: 120 },
  body: { padding: 12, gap: 6, alignItems: "flex-start" },
  titleRow: { flexDirection: "row", alignItems: "baseline", gap: 8, alignSelf: "stretch" },
  title: { flex: 1, fontSize: 16, lineHeight: 21, fontWeight: "700" },
  price: { fontSize: 15, fontWeight: "700" },
  per: { fontSize: 12, fontWeight: "500" },
  facts: { fontSize: 13 },
  matchRow: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "stretch" },
  why: { flex: 1, fontSize: 12.5, lineHeight: 17 },
  actions: { flexDirection: "row", gap: 8, marginTop: 2 },
});
