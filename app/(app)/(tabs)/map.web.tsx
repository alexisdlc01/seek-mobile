// Web build of the Find tab. react-native-maps is native only, so the web
// version shows an embedded OpenStreetMap and the same nearby-listings list.
import { VerticalListingCard } from "@/components/custom/listing-card";
import { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { listingsControllerGetFilteredListings } from "@/src/api/seek-api/listings";
import { getActiveFilters, useFilterStore } from "@/src/store/filter-store";
import { useQuickFilters } from "@/src/store/quick-filter-store";
import {
  distanceKmBetween,
  inputFromListing,
  matchHome,
  nextSeptember,
} from "@/src/utils/listing-match";
import {
  PassportBanner,
  QuickFilterChips,
  useApplyToListing,
  useMatchPrefs,
} from "@/components/seek/map-extras";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { HeartIcon, Settings2Icon, SparklesIcon, UserRoundIcon } from "lucide-react-native";
import React, { createElement, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_ORIGIN = { latitude: 56.337111, longitude: -2.795107 };
const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-2.82%2C56.325%2C-2.77%2C56.35&layer=mapnik";

export default function MapScreen() {
  const colors = useSeekTheme();
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const filters = useFilterStore((state) => state.data);
  const activeFilters = useMemo(() => getActiveFilters(filters), [filters]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["/listings/filter", "web", activeFilters],
    queryFn: ({ signal }) =>
      listingsControllerGetFilteredListings(
        {
          ...activeFilters,
          lat: DEFAULT_ORIGIN.latitude,
          lng: DEFAULT_ORIGIN.longitude,
          page: 1,
          limit: 10,
        },
        undefined,
        signal,
      ),
  });
  const prefs = useMatchPrefs();
  const applyTo = useApplyToListing();
  const fromSeptember = useQuickFilters((state) => state.fromSeptember);
  // "From Sept" is applied here because the API has no move-in filter.
  const ranked = useMemo(() => {
    const loaded = data ?? [];
    const by = new Date(nextSeptember()).getTime();
    const kept = fromSeptember
      ? loaded.filter((listing) => {
          const free = new Date(listing.availableFrom).getTime();
          return Number.isNaN(free) || free <= by;
        })
      : loaded;
    return kept
      .map((listing) => {
        const coordinates: unknown[] = Array.isArray(listing.location?.coordinates) ? listing.location.coordinates : [];
        const [lng, lat] = coordinates;
        const km =
          typeof lat === "number" && typeof lng === "number"
            ? distanceKmBetween(DEFAULT_ORIGIN, { latitude: lat, longitude: lng })
            : null;
        return { listing, match: matchHome(inputFromListing(listing, km), prefs) };
      })
      .sort((a, b) => b.match.percent - a.match.percent);
  }, [data, fromSeptember, prefs]);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.searchRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ask Seek to find a home"
          onPress={() => router.push("/(app)/(tabs)/seek-ai")}
          style={styles.searchBar}
        >
          <SparklesIcon color={colors.accent} size={20} />
          <Text style={styles.searchText} numberOfLines={1}>
            Ask Seek: 4 beds near UoB under £700
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open listing filters"
          onPress={() => router.push("/(app)/filters")}
          style={styles.roundButton}
        >
          <Settings2Icon color={colors.accent} size={22} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Saved listings"
          onPress={() => router.push("/(app)/(tabs)/saved-listings")}
          style={styles.roundButton}
        >
          <HeartIcon color={colors.accent} size={22} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="My Seek Passport and profile"
          onPress={() => router.push("/(app)/(tabs)/passport")}
          style={styles.roundButton}
        >
          <UserRoundIcon color={colors.accent} size={22} />
        </Pressable>
      </View>

      <View style={styles.chipsRow}>
        <QuickFilterChips />
      </View>

      <View style={styles.map}>
        {createElement("iframe", {
          src: MAP_SRC,
          title: "Map of nearby listings",
          style: { border: 0, width: "100%", height: "100%" },
        })}
      </View>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>
          {ranked.length} {ranked.length === 1 ? "home" : "homes"} · Sorted by best match
        </Text>
        <View style={styles.banner}>
          <PassportBanner />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator color={colors.onSheet} style={styles.message} />
          ) : ranked.length === 0 ? (
            <Text style={[styles.sheetTitle, styles.message]}>
              {isError
                ? "Couldn't load listings. Check your connection and try again."
                : "No listings yet."}
            </Text>
          ) : (
            ranked.map(({ listing, match }) => (
              <VerticalListingCard
                key={listing._id}
                data={listing}
                match={match}
                onApply={() => applyTo(listing._id)}
                onPress={() => router.push(`/(app)/location/${listing._id}/details`)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    searchRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    searchBar: {
      flex: 1,
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      borderRadius: 24,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    searchText: { flex: 1, fontSize: 14, color: colors.mutedText },
    roundButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    chipsRow: { paddingHorizontal: 16, paddingBottom: 10 },
    banner: { paddingHorizontal: 16, paddingBottom: 12 },
    map: { flex: 1, minHeight: 200, backgroundColor: colors.mapLand },
    sheet: {
      flex: 1,
      paddingTop: 14,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.sheet,
    },
    sheetTitle: {
      paddingHorizontal: 16,
      paddingBottom: 12,
      fontSize: 18,
      fontWeight: "700",
      color: colors.onSheet,
    },
    message: { paddingVertical: 24, textAlign: "center" },
  });
