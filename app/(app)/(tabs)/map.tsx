import { VStack } from "@/components/ui/vstack";
import {
  FocusIcon,
  HeartIcon,
  Settings2Icon,
  SparklesIcon,
  UserRoundIcon,
} from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import MapView, {
  LatLng,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { listingsControllerGetFilteredListings } from "@/src/api/seek-api/listings";
import { Listing } from "@/src/api/seek-api/model/listing";
import type { SearchChatListingDto } from "@/src/api/seek-api/model";
import { ListingSummaryCard } from "@/components/seek/listing-summary-card";
import { useAiMapStore } from "@/src/store/ai-map-store";
import { Pressable } from "@/components/ui/pressable";
import * as Location from "expo-location";
import BottomSheet, {
  BottomSheetFlatList as GFlatList,
} from "@gorhom/bottom-sheet";
import {
  VerticalListingCard,
} from "@/components/custom/listing-card";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getActiveFilters, useFilterStore } from "@/src/store/filter-store";
import { useQuickFilters } from "@/src/store/quick-filter-store";
import {
  distanceKmBetween,
  inputFromListing,
  matchFromSummary,
  matchHome,
  nextSeptember,
} from "@/src/utils/listing-match";
import {
  PassportBanner,
  QuickFilterChips,
  useApplyToListing,
  useMatchPrefs,
} from "@/components/seek/map-extras";

const BottomSheetFlatList = GFlatList as unknown as typeof FlashList;

const PAGE_SIZE = 5;
// Once the user pans the map we load everything in view, so show more at once.
const BOUNDS_PAGE_SIZE = 30;

type Bounds = { minLat: number; maxLat: number; minLng: number; maxLng: number };

function boundsOf(region: Region): Bounds {
  const round = (value: number) => Math.round(value * 10000) / 10000;
  return {
    minLat: round(region.latitude - region.latitudeDelta / 2),
    maxLat: round(region.latitude + region.latitudeDelta / 2),
    minLng: round(region.longitude - region.longitudeDelta / 2),
    maxLng: round(region.longitude + region.longitudeDelta / 2),
  };
}

type MapMarkerData = { id: string; coordinate: LatLng; price: number | null };

function summaryCoordinate(listing: SearchChatListingDto): LatLng | null {
  const { lat, lng } = listing;
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { latitude: lat, longitude: lng };
}
// Used to sort listings by distance until (or unless) we know where the user is.
const DEFAULT_ORIGIN: LatLng = { latitude: 56.337111, longitude: -2.795107 };

export default function MapScreen() {
  const colors = useSeekTheme();
  const styles = useThemedStyles(createStyles);
  const filters = useFilterStore((state) => state.data);
  const clearFilters = useFilterStore((state) => state.clear);
  const activeFilters = useMemo(() => getActiveFilters(filters), [filters]);
  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const origin = useUserLocation();
  const aiResults = useAiMapStore((state) => state.results);
  const clearAiResults = useAiMapStore((state) => state.clear);
  // The visible map area once the user has moved the map; null = nearest first.
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const pageSize = bounds ? BOUNDS_PAGE_SIZE : PAGE_SIZE;
  const [query, setQuery] = useState("");
  const prefs = useMatchPrefs();
  const fromSeptember = useQuickFilters((state) => state.fromSeptember);
  const applyTo = useApplyToListing();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["/listings/filter", "map", activeFilters, bounds ?? origin],
    queryFn: ({ pageParam, signal }) =>
      listingsControllerGetFilteredListings(
        {
          ...activeFilters,
          ...(bounds ?? { lat: origin.latitude, lng: origin.longitude }),
          page: pageParam,
          limit: pageSize,
        },
        undefined,
        signal,
      ),
    enabled: !aiResults,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < pageSize ? undefined : allPages.length + 1,
  });
  const loadedListings = useMemo(() => data?.pages.flat() ?? [], [data]);
  // "From Sept" is applied here because the API has no move-in filter.
  const listings = useMemo(() => {
    if (!fromSeptember) return loadedListings;
    const by = new Date(nextSeptember()).getTime();
    return loadedListings.filter((listing) => {
      const free = new Date(listing.availableFrom).getTime();
      return Number.isNaN(free) || free <= by;
    });
  }, [loadedListings, fromSeptember]);
  // Match % and the "why" line of every home, best match first.
  const matches = useMemo(() => {
    const map = new Map<string, ReturnType<typeof matchHome>>();
    for (const listing of listings) {
      const coordinate = getListingCoordinate(listing);
      const km = coordinate ? distanceKmBetween(origin, coordinate) : null;
      map.set(listing._id, matchHome(inputFromListing(listing, km), prefs));
    }
    return map;
  }, [listings, origin, prefs]);
  const aiMatches = useMemo(() => {
    const map = new Map<string, ReturnType<typeof matchHome>>();
    for (const listing of aiResults ?? []) {
      map.set(listing.id, matchFromSummary(listing));
    }
    return map;
  }, [aiResults]);

  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const sheetListings = useMemo(() => {
    const ranked = [...listings].sort(
      (a, b) => (matches.get(b._id)?.percent ?? 0) - (matches.get(a._id)?.percent ?? 0),
    );
    const selected = ranked.find((listing) => listing._id === selectedListingId);
    if (!selected) return ranked;
    return [selected, ...ranked.filter((listing) => listing !== selected)];
  }, [listings, matches, selectedListingId]);
  const sheetAiResults = useMemo(() => {
    if (!aiResults) return null;
    const selected = aiResults.find((listing) => listing.id === selectedListingId);
    if (!selected) return aiResults;
    return [selected, ...aiResults.filter((listing) => listing !== selected)];
  }, [aiResults, selectedListingId]);
  const markers = useMemo<MapMarkerData[]>(
    () =>
      aiResults
        ? aiResults.flatMap((listing) => {
            const coordinate = summaryCoordinate(listing);
            return coordinate
              ? [{ id: listing.id, coordinate, price: listing.rentPerPerson ?? listing.monthlyRent }]
              : [];
          })
        : listings.flatMap((listing) => {
            const coordinate = getListingCoordinate(listing);
            return coordinate
              ? [{ id: listing._id, coordinate, price: Math.round(listing.monthlyRent / Math.max(1, listing.numOfPeople)) }]
              : [];
          }),
    [aiResults, listings],
  );

  const router = useRouter();

  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);
  const fittedFirstPageKey = useRef<string | undefined>(undefined);

  // Frame the first page of results once per search; later pages load
  // as the user scrolls and should not move the map.
  const frame = useCallback((coordinates: LatLng[]) => {
    if (coordinates.length === 0) return;
    if (coordinates.length === 1) {
      mapRef.current?.animateToRegion(
        { ...coordinates[0], latitudeDelta: 0.04, longitudeDelta: 0.04 },
        350,
      );
      return;
    }
    mapRef.current?.fitToCoordinates(coordinates, {
      animated: true,
      edgePadding: { top: 80, right: 50, bottom: 80, left: 50 },
    });
  }, []);

  // Seek AI's picks ("Show on map") take over the map until cleared.
  useEffect(() => {
    if (!mapReady || !aiResults) return;
    frame(aiResults.flatMap((listing) => summaryCoordinate(listing) ?? []));
  }, [aiResults, mapReady, frame]);

  // A new filter starts a fresh nearest-first search.
  useEffect(() => {
    setBounds(null);
    fittedFirstPageKey.current = undefined;
  }, [activeFilters]);

  useEffect(() => {
    const firstPage = data?.pages[0] ?? [];
    // Once the user moves the map they are browsing; never move it for them.
    if (!mapReady || bounds || aiResults || firstPage.length === 0) return;

    const firstPageKey = firstPage.map((listing) => listing._id).join("|");
    if (fittedFirstPageKey.current === firstPageKey) return;
    fittedFirstPageKey.current = firstPageKey;

    const coordinates = firstPage.flatMap((listing) => {
      const coordinate = getListingCoordinate(listing);
      return coordinate ? [coordinate] : [];
    });
    frame(coordinates);
  }, [data, mapReady, bounds, aiResults, frame]);

  const centerLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Unable to center location",
        "Please enable location services",
      );
      return;
    }
    const { coords: { longitude, latitude } } = await Location.getCurrentPositionAsync({});
    const region = { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 };
    mapRef.current?.animateToRegion(region, 300);
    clearAiResults();
    setBounds(boundsOf(region));
  }, [clearAiResults]);

  const { top } = useSafeAreaInsets();

  const sheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<FlashListRef<Listing>>(null);

  function handleMarkerPress(e: MarkerPressEvent, id: string) {
    setSelectedListingId(id);
    sheetRef.current?.snapToIndex(1);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    e.stopPropagation();
  }

  function dismissSelectedListing() {
    setSelectedListingId(null);
  }

  function handleCardPress(id: string) {
    router.push(`/(app)/location/${id}/details`);
  }

  function handleAskSeekAi() {
    const q = query.trim();
    setQuery("");
    Keyboard.dismiss();
    router.push(
      q
        ? { pathname: "/(app)/(tabs)/seek-ai", params: { q } }
        : "/(app)/(tabs)/seek-ai",
    );
  }

  function handleRegionChange(region: Region, details?: { isGesture?: boolean }) {
    // Only the user's own pan or zoom re-searches; our fits and animations don't.
    if (!details?.isGesture || aiResults) return;
    setBounds(boundsOf(region));
  }

  function handleFilterPress() {
    router.push("/(app)/filters")
  }

  function handleEndReached() {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }

  return (
    <VStack className="flex-1">
      <MapView
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        onMapReady={() => setMapReady(true)}
        onRegionChangeComplete={handleRegionChange}
        onPanDrag={() => {
          dismissSelectedListing();
          Keyboard.dismiss();
        }}
        onPress={() => {
          dismissSelectedListing();
          Keyboard.dismiss();
        }}
        initialRegion={{
          ...DEFAULT_ORIGIN,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {markers.map(({ id, coordinate, price }) => (
          <ListingMarker
            key={id}
            price={price}
            coordinate={coordinate}
            selected={id === selectedListingId}
            onPress={(e) => handleMarkerPress(e, id)}
          />
        ))}
      </MapView>

      <View
        style={[styles.overlay, { paddingTop: top + 10 }]}
        pointerEvents="box-none"
      >
        <View style={styles.searchRow} pointerEvents="box-none">
          <View style={styles.searchBar}>
            <SparklesIcon color={colors.accent} size={20} />
            <TextInput
              accessibilityLabel="Ask Seek AI to find a home"
              placeholder="Ask Seek AI: 4 beds near UoB under £700"
              placeholderTextColor={colors.mutedText}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleAskSeekAi}
              returnKeyType="search"
              selectionColor={colors.accent}
              style={styles.searchText}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open listing filters"
            onPress={handleFilterPress}
            style={styles.roundButton}
          >
            <Settings2Icon color={colors.accent} size={22} />
          </Pressable>
        </View>

        <QuickFilterChips />

        {aiResults ? (
          <View style={styles.aiBanner}>
            <SparklesIcon color={colors.accent} size={16} />
            <Text style={styles.aiBannerText} numberOfLines={1}>
              Seek AI picks · {aiResults.length} {aiResults.length === 1 ? "home" : "homes"}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear Seek AI picks"
              onPress={() => {
                clearAiResults();
                setSelectedListingId(null);
                fittedFirstPageKey.current = undefined;
              }}
              hitSlop={8}
            >
              <Text style={styles.aiBannerAction}>Clear</Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.sideButtons} pointerEvents="box-none">
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Center on my location"
            onPress={() => void centerLocation()}
            style={styles.roundButton}
          >
            <FocusIcon color={colors.accent} size={22} />
          </Pressable>
        </View>
      </View>

      <BottomSheet
        snapPoints={["12%", "50%", "88%"]}
        index={1}
        topInset={top + 2}
        enableDynamicSizing={false}
        ref={sheetRef}
        backgroundStyle={{
          backgroundColor: colors.sheet,
        }}
        handleStyle={{
          backgroundColor: colors.sheet,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.sheetHandle,
        }}
      >
        {sheetAiResults ? (
          <BottomSheetFlatList<SearchChatListingDto>
            showsVerticalScrollIndicator={false}
            data={sheetAiResults}
            extraData={selectedListingId}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>
                  {sheetAiResults.length} {sheetAiResults.length === 1 ? "home" : "homes"} · Seek AI picks
                </Text>
                <PassportBanner />
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.aiCard}>
                <ListingSummaryCard
                  listing={item}
                  onPress={() => handleCardPress(item.id)}
                  match={aiMatches.get(item.id)}
                  onApply={() => applyTo(item.id)}
                />
              </View>
            )}
          />
        ) : (
        <BottomSheetFlatList<Listing>
          ref={listRef}
          showsVerticalScrollIndicator={false}
          data={sheetListings}
          extraData={selectedListingId}
          keyExtractor={(item) => item._id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>
                {listings.length} {listings.length === 1 ? "home" : "homes"} · Sorted by AI match
              </Text>
              <PassportBanner />
            </View>
          }
          ListEmptyComponent={
            <SheetMessage
              isLoading={isLoading}
              isError={isError}
              hasActiveFilters={hasActiveFilters}
              onRetry={() => void refetch()}
              onClearFilters={clearFilters}
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color={colors.onSheet}
                style={{ paddingVertical: 16 }}
              />
            ) : null
          }
          renderItem={({ item }) => (
            <VerticalListingCard
              data={item}
              onPress={() => handleCardPress(item._id)}
              match={matches.get(item._id)}
              onApply={() => applyTo(item._id)}
            />
          )}
        />
        )}
      </BottomSheet>
    </VStack>
  );
}

type SheetMessageProps = {
  isLoading: boolean;
  isError: boolean;
  hasActiveFilters: boolean;
  onRetry: () => void;
  onClearFilters: () => void;
};

function SheetMessage({
  isLoading,
  isError,
  hasActiveFilters,
  onRetry,
  onClearFilters,
}: SheetMessageProps) {
  const colors = useSeekTheme();
  const styles = useThemedStyles(createStyles);
  if (isLoading) {
    return (
      <ActivityIndicator
        color={colors.onSheet}
        style={{ paddingVertical: 24 }}
      />
    );
  }

  const message = isError
    ? "Couldn't load listings. Check your connection and try again."
    : hasActiveFilters
      ? "No listings match your filters."
      : "No listings yet.";
  const action = isError
    ? { label: "Try again", onPress: onRetry }
    : hasActiveFilters
      ? { label: "Clear filters", onPress: onClearFilters }
      : null;

  return (
    <VStack className="items-center gap-4 px-6 py-6">
      <Text style={styles.sheetMessage}>{message}</Text>
      {action ? (
        <Pressable onPress={action.onPress} style={styles.sheetAction}>
          <Text style={styles.sheetActionText}>{action.label}</Text>
        </Pressable>
      ) : null}
    </VStack>
  );
}

/** The user's position if they allow it, otherwise the default map centre. */
function useUserLocation(): LatLng {
  const [origin, setOrigin] = useState<LatLng>(DEFAULT_ORIGIN);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        const position =
          (await Location.getLastKnownPositionAsync()) ??
          (await Location.getCurrentPositionAsync({}));
        if (!cancelled && position) {
          setOrigin({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      } catch {
        // Keep the default origin; listings still load, sorted from there.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return origin;
}

type ListingMarkerProps = {
  price: number | null;
  coordinate: LatLng;
  selected: boolean;
  onPress?: (e: MarkerPressEvent) => void;
};
function ListingMarker({
  price,
  coordinate,
  selected,
  onPress,
}: ListingMarkerProps) {
  const styles = useThemedStyles(createStyles);
  const [track, setTrack] = useState<boolean>(true);
  // Let the marker re-render once when its price pill changes look.
  useEffect(() => {
    setTrack(true);
    const timer = setTimeout(() => {
      setTrack(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selected]);

  return (
    <Marker
      onPress={onPress}
      tracksViewChanges={track}
      coordinate={coordinate}
    >
      <View style={[styles.pill, selected && styles.pillSelected]}>
        <Text
          style={[styles.pillText, selected && styles.pillTextSelected]}
          numberOfLines={1}
        >
          {price == null ? "–" : `£${price}`}
        </Text>
      </View>
    </Marker>
  );
}

function getListingCoordinate(listing: Listing): LatLng | null {
  const location = listing.location;
  const coordinates = Array.isArray(location?.coordinates)
    ? location.coordinates
    : null;
  const longitude = coordinates?.[0];
  const latitude = coordinates?.[1];

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return { latitude, longitude };
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 20,
      paddingHorizontal: 16,
      gap: 10,
    },
    searchRow: { flexDirection: "row", alignItems: "center", gap: 10 },
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
      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    searchText: { flex: 1, minWidth: 0, fontSize: 14, color: colors.text, padding: 0 },
    aiBanner: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    aiBannerText: { fontSize: 13, fontWeight: "600", color: colors.text },
    aiBannerAction: { fontSize: 13, fontWeight: "700", color: colors.accent },
    aiCard: { paddingHorizontal: 16, paddingBottom: 12 },
    roundButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    sideButtons: { alignItems: "flex-end", gap: 10 },
    pill: {
      minWidth: 56,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      alignItems: "center",
      backgroundColor: colors.primary,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    pillSelected: {
      backgroundColor: colors.surface,
      borderColor: colors.primary,
    },
    pillText: { fontSize: 13, fontWeight: "700", color: colors.onPrimary },
    pillTextSelected: { color: colors.text },
    sheetHeader: { gap: 12, paddingHorizontal: 16, paddingBottom: 12 },
    sheetTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.onSheet,
    },
    sheetMessage: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
      color: colors.onSheet,
    },
    sheetAction: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 999,
      // `primary` is the same navy as the sheet in light mode, so use the chip colours.
      backgroundColor: colors.heroChip,
    },
    sheetActionText: { fontWeight: "700", color: colors.onHeroChip },
  });
