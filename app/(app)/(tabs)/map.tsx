import { VStack } from "@/components/ui/vstack";
import {
  FocusIcon,
  HeartIcon,
  HouseIcon,
  Settings2Icon,
  SparklesIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Camera,
  type CameraRef,
  Map as MapView,
  type LngLatBounds,
  type MapRef,
  Marker,
} from "@maplibre/maplibre-react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
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
import { SEEK_MAP_STYLE } from "@/constants/map-style";
import { collidingPills } from "@/src/utils/map-pills";
import { LikeButton } from "@/components/custom/like-button";
import { useAuthRequiredAction } from "@/components/custom/auth-required";
import { useLike, useUnlike } from "@/hooks/like";
import { useListingLiked } from "@/hooks/use-listing-liked";
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
type LatLng = { latitude: number; longitude: number };

function boundsOf([west, south, east, north]: LngLatBounds): Bounds {
  const round = (value: number) => Math.round(value * 10000) / 10000;
  return {
    minLat: round(south),
    maxLat: round(north),
    minLng: round(west),
    maxLng: round(east),
  };
}

type MapMarkerData = { id: string; coordinate: LatLng; price: number | null };
type MapCardData = {
  id: string;
  title: string;
  info: string;
  photo: string | null;
  price: number | null;
  priceNote: string;
};

/** Per-person rent, or null when the listing has none to show. */
function rentEach(rent: number | null | undefined, people = 1): number | null {
  if (typeof rent !== "number" || !Number.isFinite(rent) || rent <= 0) return null;
  return Math.round(rent / Math.max(1, people));
}

function summaryCoordinate(listing: SearchChatListingDto): LatLng | null {
  const { lat, lng } = listing;
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { latitude: lat, longitude: lng };
}
// Used to sort listings by distance until (or unless) we know where the user is.
const DEFAULT_ORIGIN: LatLng = { latitude: 56.337111, longitude: -2.795107 };
// MapLibre zoom matching the old 0.01° region around the user (512px tiles).
const STREET_ZOOM = 15;

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
              ? [{ id: listing.id, coordinate, price: rentEach(listing.rentPerPerson ?? listing.monthlyRent) }]
              : [];
          })
        : listings.flatMap((listing) => {
            const coordinate = getListingCoordinate(listing);
            return coordinate
              ? [{ id: listing._id, coordinate, price: rentEach(listing.monthlyRent, listing.numOfPeople) }]
              : [];
          }),
    [aiResults, listings],
  );

  // Airbnb-style card for the selected home, floating above the collapsed sheet.
  const selectedCard = useMemo<MapCardData | null>(() => {
    if (!selectedListingId) return null;
    if (aiResults) {
      const listing = aiResults.find((item) => item.id === selectedListingId);
      if (!listing) return null;
      const each = listing.rentPerPerson != null;
      return {
        id: listing.id,
        title: listing.title,
        info: [listing.bedrooms != null ? `${listing.bedrooms} bed` : null, listing.address ?? listing.city]
          .filter(Boolean)
          .join(" · "),
        photo: listing.photo,
        price: rentEach(listing.rentPerPerson ?? listing.monthlyRent),
        priceNote: each ? "pcm each" : "pcm",
      };
    }
    const listing = listings.find((item) => item._id === selectedListingId);
    if (!listing) return null;
    return {
      id: listing._id,
      title: listing.propertyTitle,
      info: [listing.bedroomsCount ? `${listing.bedroomsCount} bed` : null, listing.streetAddress]
        .filter(Boolean)
        .join(" · "),
      photo: listing.photos?.at(0) ?? null,
      price: rentEach(listing.monthlyRent, listing.numOfPeople),
      priceNote: listing.numOfPeople > 1 ? "pcm each" : "pcm",
    };
  }, [aiResults, listings, selectedListingId]);

  // Zoom of the last finished camera move: pills that overlap there become dots.
  const [zoom, setZoom] = useState(STREET_ZOOM);
  const dots = useMemo(
    () =>
      collidingPills(
        markers.map(({ id, coordinate, price }) => ({
          id,
          lng: coordinate.longitude,
          lat: coordinate.latitude,
          price,
        })),
        selectedListingId,
        zoom,
      ),
    [markers, selectedListingId, zoom],
  );
  // Homes whose card was opened this visit get a grey price, like Airbnb.
  const [seenIds, setSeenIds] = useState<ReadonlySet<string>>(() => new Set());

  const router = useRouter();

  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);
  const [mapReady, setMapReady] = useState(false);
  const fittedFirstPageKey = useRef<string | undefined>(undefined);

  // Frame the first page of results once per search; later pages load
  // as the user scrolls and should not move the map.
  const { top } = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const frame = useCallback((coordinates: LatLng[]) => {
    // Keep pins clear of the search bar + chips, the side buttons and the list (opens at 50%).
    const padding = { top: top + 150, right: 90, bottom: windowHeight * 0.5 + 20, left: 40 };
    if (coordinates.length <= 1) {
      const { longitude, latitude } = coordinates[0] ?? DEFAULT_ORIGIN;
      cameraRef.current?.easeTo({
        center: [longitude, latitude],
        zoom: coordinates.length ? 14 : STREET_ZOOM,
        padding,
        duration: 350,
      });
      return;
    }
    const lngs = coordinates.map((coordinate) => coordinate.longitude);
    const lats = coordinates.map((coordinate) => coordinate.latitude);
    cameraRef.current?.fitBounds(
      [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)],
      { padding, duration: 500 },
    );
  }, [top, windowHeight]);

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
    cameraRef.current?.easeTo({ center: [longitude, latitude], zoom: STREET_ZOOM, duration: 300 });
    clearAiResults();
    // Search the same ~0.01° box around the user as before.
    setBounds(boundsOf([longitude - 0.005, latitude - 0.005, longitude + 0.005, latitude + 0.005]));
  }, [clearAiResults]);

  const sheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<FlashListRef<Listing>>(null);
  const [sheetIndex, setSheetIndex] = useState(1);
  // Keep the card and attribution glued to the top edge of the sheet.
  const sheetTop = useSharedValue(0);
  const screenHeight = useSharedValue(0);
  const aboveSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTop.get() - screenHeight.get() }],
  }));

  // iOS also reports the tap (and deselect of the previous annotation) as a map press
  // right after a Marker press, which cleared the selection at once.
  const lastMarkerPress = useRef(0);
  function dismissFromMap() {
    if (Date.now() - lastMarkerPress.current < 600) return;
    dismissSelectedListing();
    Keyboard.dismiss();
  }

  function handleMarkerPress(id: string) {
    lastMarkerPress.current = Date.now();
    setSelectedListingId(id);
    setSeenIds((seen) => (seen.has(id) ? seen : new Set(seen).add(id)));
    // Collapse the list so the card shows over the map; the list still starts with this home.
    sheetRef.current?.snapToIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
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

  function handleRegionChange(view: { zoom: number; bounds: LngLatBounds; userInteraction: boolean }) {
    setZoom(view.zoom);
    // Only the user's own pan or zoom re-searches; our fits and animations don't.
    if (!view.userInteraction || aiResults) return;
    setBounds(boundsOf(view.bounds));
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
    <VStack
      className="flex-1"
      onLayout={(event) => {
        screenHeight.set(event.nativeEvent.layout.height);
      }}
    >
      <MapView
        mapStyle={SEEK_MAP_STYLE}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        touchRotate={false}
        touchPitch={false}
        compass={false}
        // Attribution is drawn by us above the sheet; the MapLibre logo is optional (BSD licence).
        attribution={false}
        logo={false}
        onDidFinishLoadingMap={() => setMapReady(true)}
        onRegionDidChange={(event) => handleRegionChange(event.nativeEvent)}
        onRegionWillChange={(event) => {
          if (event.nativeEvent.userInteraction) dismissFromMap();
        }}
        onPress={dismissFromMap}
      >
        <Camera
          ref={cameraRef}
          initialViewState={{
            center: [DEFAULT_ORIGIN.longitude, DEFAULT_ORIGIN.latitude],
            zoom: STREET_ZOOM,
          }}
        />
        {markers
          // Dots under pills, the selected pill on top.
          .map((marker) => ({
            ...marker,
            selected: marker.id === selectedListingId,
            dot: dots.has(marker.id),
          }))
          .sort((a, b) => Number(b.dot) - Number(a.dot) || Number(a.selected) - Number(b.selected))
          .map(({ id, coordinate, price, selected, dot }) => (
            <Marker
              key={id}
              id={id}
              lngLat={[coordinate.longitude, coordinate.latitude]}
              onPress={() => handleMarkerPress(id)}
            >
              <PricePill
                price={price}
                selected={selected}
                seen={seenIds.has(id)}
                dot={dot}
              />
            </Marker>
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
              accessibilityLabel="Ask Seek to find a home"
              placeholder="Ask Seek: 4 beds near UoB under £700"
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
              Seek picks · {aiResults.length} {aiResults.length === 1 ? "home" : "homes"}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear Seek picks"
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

      <Animated.View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, aboveSheetStyle]}
      >
        <View style={styles.aboveSheet} pointerEvents="box-none">
          {selectedCard && sheetIndex === 0 ? (
            <MapCard
              card={selectedCard}
              onOpen={() => handleCardPress(selectedCard.id)}
              onClose={dismissSelectedListing}
            />
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Map data attribution"
            onPress={() => void mapRef.current?.showAttribution()}
            style={styles.attribution}
            hitSlop={6}
          >
            <Text style={styles.attributionText}>
              © OpenFreeMap © OpenMapTiles © OpenStreetMap contributors
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      <BottomSheet
        snapPoints={["12%", "50%", "88%"]}
        index={1}
        topInset={top + 2}
        enableDynamicSizing={false}
        ref={sheetRef}
        animatedPosition={sheetTop}
        onChange={setSheetIndex}
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
                  {sheetAiResults.length} {sheetAiResults.length === 1 ? "home" : "homes"} · Seek picks
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
                {listings.length} {listings.length === 1 ? "home" : "homes"} · Sorted by best match
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

type PricePillProps = {
  price: number | null;
  selected: boolean;
  seen: boolean;
  dot: boolean;
};

/** Airbnb-style price pill; shrinks to a dot when it would overlap a kept pill. */
function PricePill({ price, selected, seen, dot }: PricePillProps) {
  const styles = useThemedStyles(createStyles);
  const label = price == null ? "Home" : `£${price} per month`;
  if (dot && !selected) {
    return (
      <View style={styles.pillFrame} accessibilityLabel={label}>
        <View style={styles.dot} />
      </View>
    );
  }
  const color = selected ? "#FFFFFF" : seen ? "#717171" : "#222222";
  return (
    <View style={styles.pillFrame} accessibilityLabel={label}>
      <View
        style={[
          styles.pill,
          price == null && styles.pillHome,
          selected && styles.pillSelected,
        ]}
      >
        {price == null ? (
          <HouseIcon color={color} size={14} strokeWidth={2.4} />
        ) : (
          <Text style={[styles.pillText, { color }]} numberOfLines={1}>
            £{price}
          </Text>
        )}
      </View>
    </View>
  );
}

type MapCardProps = {
  card: MapCardData;
  onOpen: () => void;
  onClose: () => void;
};

function MapCard({ card, onOpen, onClose }: MapCardProps) {
  const styles = useThemedStyles(createStyles);
  const requireAuth = useAuthRequiredAction("save listings");
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();
  const liked = useListingLiked(card.id);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${card.title}`}
        onPress={onOpen}
        style={styles.cardBody}
      >
        {card.photo ? (
          <Image source={{ uri: card.photo }} style={styles.cardPhoto} />
        ) : (
          <View style={styles.cardPhoto} />
        )}
        <View style={styles.cardText}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {card.title}
          </Text>
          {card.info ? (
            <Text style={styles.cardInfo} numberOfLines={1}>
              {card.info}
            </Text>
          ) : null}
          {card.price != null ? (
            <Text style={styles.cardPrice}>
              <Text style={styles.cardPriceAmount}>£{card.price}</Text> {card.priceNote}
            </Text>
          ) : null}
        </View>
      </Pressable>
      <View style={styles.cardActions}>
        <LikeButton
          size={16}
          liked={liked}
          like={() => { if (requireAuth()) like({ id: card.id }); }}
          unlike={() => { if (requireAuth()) unlike({ id: card.id }); }}
          iconColor="#222222"
          activeColor="#FF385C"
          containerClassName="bg-white"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          onPress={onClose}
          hitSlop={8}
          style={styles.cardClose}
        >
          <XIcon color="#222222" size={16} strokeWidth={2.4} />
        </Pressable>
      </View>
    </View>
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
    // Room around the pill so its shadow is not clipped by the marker view.
    pillFrame: { padding: 4, alignItems: "center", justifyContent: "center" },
    pill: {
      height: 28,
      paddingHorizontal: 10,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(0,0,0,0.08)",
      shadowColor: "#000",
      shadowOpacity: 0.18,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    pillHome: { width: 30, paddingHorizontal: 0 },
    pillSelected: { backgroundColor: "#222222", borderColor: "#222222" },
    pillText: { fontSize: 13.5, fontWeight: "700" },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: "#222222",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    aboveSheet: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 6,
      gap: 6,
    },
    attribution: { alignSelf: "flex-end" },
    attributionText: {
      fontSize: 10,
      color: "#717171",
      textShadowColor: "#FFFFFF",
      textShadowRadius: 3,
    },
    card: {
      borderRadius: 16,
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 8,
    },
    cardBody: { flexDirection: "row", borderRadius: 16, overflow: "hidden" },
    cardPhoto: { width: 112, height: 104, backgroundColor: "#EBEBEB" },
    cardText: {
      flex: 1,
      minWidth: 0,
      justifyContent: "center",
      gap: 2,
      paddingVertical: 8,
      paddingLeft: 12,
      paddingRight: 76,
    },
    cardTitle: { fontSize: 15, fontWeight: "600", color: "#222222" },
    cardInfo: { fontSize: 13, color: "#717171" },
    cardPrice: { marginTop: 4, fontSize: 14, color: "#222222" },
    cardPriceAmount: { fontWeight: "700", color: "#222222" },
    cardActions: {
      position: "absolute",
      top: 8,
      right: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    cardClose: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
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
