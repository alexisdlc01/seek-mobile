import { Box } from "@/components/ui/box";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useAutocomplete } from "@/src/api/maps-api/places-api";
import {
  FocusIcon,
  Settings2Icon,
} from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
} from "react-native";
import MapView, {
  LatLng,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { listingsControllerGetFilteredListings } from "@/src/api/seek-api/listings";
import { Listing } from "@/src/api/seek-api/model/listing";
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
import { PROFILE_COLORS } from "@/constants/design";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getActiveFilters, useFilterStore } from "@/src/store/filter-store";
import { RoundIconButton } from "@/components/custom/round-icon-button";
import { ProfileButton } from "@/components/custom/profile-button";

const BottomSheetFlatList = GFlatList as unknown as typeof FlashList;

const PAGE_SIZE = 5;
// Used to sort listings by distance until (or unless) we know where the user is.
const DEFAULT_ORIGIN: LatLng = { latitude: 56.337111, longitude: -2.795107 };

export default function MapScreen() {
  const filters = useFilterStore((state) => state.data);
  const clearFilters = useFilterStore((state) => state.clear);
  const activeFilters = useMemo(() => getActiveFilters(filters), [filters]);
  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const origin = useUserLocation();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["/listings/filter", "nearby", activeFilters, origin],
    queryFn: ({ pageParam, signal }) =>
      listingsControllerGetFilteredListings(
        {
          ...activeFilters,
          lat: origin.latitude,
          lng: origin.longitude,
          page: pageParam,
          limit: PAGE_SIZE,
        },
        undefined,
        signal,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
  });
  const listings = useMemo(() => data?.pages.flat() ?? [], [data]);

  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const sheetListings = useMemo(() => {
    const selected = listings.find((listing) => listing._id === selectedListingId);
    if (!selected) return listings;
    return [selected, ...listings.filter((listing) => listing !== selected)];
  }, [listings, selectedListingId]);
  const listingMarkers = useMemo(
    () =>
      listings.flatMap((listing) => {
        const coordinate = getListingCoordinate(listing);
        return coordinate ? [{ listing, coordinate }] : [];
      }),
    [listings],
  );

  const router = useRouter();

  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);
  const fittedFirstPageKey = useRef<string | undefined>(undefined);

  // Frame the first page of results once per search; later pages load
  // as the user scrolls and should not move the map.
  useEffect(() => {
    const firstPage = data?.pages[0] ?? [];
    if (!mapReady || firstPage.length === 0) return;

    const firstPageKey = firstPage.map((listing) => listing._id).join("|");
    if (fittedFirstPageKey.current === firstPageKey) return;
    fittedFirstPageKey.current = firstPageKey;

    const coordinates = firstPage.flatMap((listing) => {
      const coordinate = getListingCoordinate(listing);
      return coordinate ? [coordinate] : [];
    });
    if (coordinates.length === 0) return;
    if (coordinates.length === 1) {
      mapRef.current?.animateToRegion(
        {
          ...coordinates[0],
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        350,
      );
      return;
    }

    mapRef.current?.fitToCoordinates(coordinates, {
      animated: true,
      edgePadding: { top: 80, right: 50, bottom: 80, left: 50 },
    });
  }, [data, mapReady]);

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
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 300);
  }, []);

  const { top } = useSafeAreaInsets();

  // TODO: replace with expo-crypto uuid
  const sessionToken = useRef(Math.random().toString(36).substring(7));

  // querying places api
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const { data: placesData } = useAutocomplete(
    {
      sessiontoken: sessionToken.current,
      input: debouncedQuery,
      radius: 10000,
      locationbias: "circle:500@56.337111,-2.795107",
    },
    {
      query: {
        enabled: debouncedQuery.length > 3,
        staleTime: 1000 * 60,
      },
    },
  );
  const locations = placesData?.data.predictions ?? [];
  const showSearch = searchFocused && locations.length > 0 && query.length > 3;

  const sheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<FlashListRef<Listing>>(null);

  function handleMarkerPress(e: MarkerPressEvent, listing: Listing) {
    setSelectedListingId(listing._id);
    sheetRef.current?.snapToIndex(1);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    e.stopPropagation();
  }

  function dismissSelectedListing() {
    setSelectedListingId(null);
  }

  function handleCardPress(listing: Listing) {
    router.push(`/(app)/location/${listing._id}/details`);
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
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        onMapReady={() => setMapReady(true)}
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
        {listingMarkers.map(({ listing, coordinate }) => (
          <ListingMarker
            key={listing._id}
            listing={listing}
            coordinate={coordinate}
            onPress={(e) => handleMarkerPress(e, listing)}
          />
        ))}
      </MapView>

      <Box
        className="absolute left-0 right-0 z-20"
        pointerEvents="box-none"
        style={{
          paddingTop: top + 10,
          paddingHorizontal: 16,
        }}
      >
        <Box className="flex-row items-center gap-3" pointerEvents="box-none">
          <ProfileButton />
          <Box className="flex-1">
            <Input
              variant="rounded"
              className="h-12 border border-primary-500 bg-secondary-100"
            >
              <InputSlot className="pl-3">
                <InputIcon as={SearchIcon} size="xl" />
              </InputSlot>
              <InputField
                value={query}
                onChangeText={setQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </Input>
            {showSearch && (
              <Box className="absolute top-14 z-10 w-full">
                <Box className="w-full rounded-xl bg-white p-2">
                  <FlatList
                    data={locations}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item }) => (
                      <Text className="line-clamp-2 text-primary-600">
                        {item.description}
                      </Text>
                    )}
                  />
                </Box>
              </Box>
            )}
          </Box>
          <RoundIconButton
            icon={Settings2Icon}
            accessibilityLabel="Open listing filters"
            onPress={handleFilterPress}
          />
        </Box>

        <Box className="mt-3 items-end" pointerEvents="box-none">
          <RoundIconButton
            icon={FocusIcon}
            accessibilityLabel="Center on my location"
            onPress={() => void centerLocation()}
          />
        </Box>
      </Box>

      <BottomSheet
        snapPoints={["12%", "50%", "88%"]}
        index={1}
        topInset={top + 2}
        enableDynamicSizing={false}
        ref={sheetRef}
        backgroundStyle={{
          backgroundColor: PROFILE_COLORS.accent,
        }}
        handleStyle={{
          backgroundColor: PROFILE_COLORS.accent,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
      >
        <BottomSheetFlatList<Listing>
          ref={listRef}
          showsVerticalScrollIndicator={false}
          data={sheetListings}
          extraData={selectedListingId}
          keyExtractor={(item) => item._id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <Text className="px-4 pb-3 text-lg font-semibold text-white">
              Nearest listings
            </Text>
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
              <ActivityIndicator color="white" style={{ paddingVertical: 16 }} />
            ) : null
          }
          renderItem={({ item }) => (
            <VerticalListingCard
              data={item}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
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
  if (isLoading) {
    return <ActivityIndicator color="white" style={{ paddingVertical: 24 }} />;
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
      <Text className="text-center text-base font-semibold text-white">
        {message}
      </Text>
      {action ? (
        <Pressable
          onPress={action.onPress}
          className="rounded-full bg-white px-6 py-3"
        >
          <Text className="font-semibold text-primary-500">{action.label}</Text>
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
  listing: Listing;
  coordinate: LatLng;
  onPress?: (e: MarkerPressEvent) => void;
};
function ListingMarker({ listing, coordinate, onPress }: ListingMarkerProps) {
  const [track, setTrack] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTrack(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Marker
      onPress={onPress}
      tracksViewChanges={track}
      coordinate={coordinate}
    >
      <Pressable className="bg-primary-500 rounded-full items-center justify-center w-14 aspect-square">
        <Text className="text-center text-sm text-white line-clamp-1">
          £{listing.monthlyRent}
        </Text>
      </Pressable>
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
