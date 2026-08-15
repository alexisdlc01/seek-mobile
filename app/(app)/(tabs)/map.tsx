import { Box } from "@/components/ui/box";
import { useDebounce } from "use-debounce";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useAutocomplete } from "@/src/api/maps-api/places-api";
import {
  FocusIcon,
  Settings2Icon,
} from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
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
import { useListingsControllerGetAllVerifiedListings } from "@/src/api/seek-api/listings";
import { Listing } from "@/src/api/seek-api/model/listing";
import { Pressable } from "@/components/ui/pressable";
import * as Location from "expo-location";
import BottomSheet, {
  BottomSheetFlatList as GFlatList,
} from "@gorhom/bottom-sheet";
import {
  VerticalListingCard,
} from "@/components/custom/listing-card";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { PROFILE_COLORS } from "@/constants/design";

const BottomSheetFlatList = GFlatList as unknown as typeof FlashList;

export default function MapScreen() {
  const {
    data: listings,
  } = useListingsControllerGetAllVerifiedListings();
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const selectedListing = useMemo(
    () => listings?.find((listing) => listing._id === selectedListingId),
    [listings, selectedListingId],
  );
  const listingMarkers = useMemo(
    () =>
      (listings ?? []).flatMap((listing) => {
        const coordinate = getListingCoordinate(listing);
        return coordinate ? [{ listing, coordinate }] : [];
      }),
    [listings],
  );

  const router = useRouter();

  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);
  const fittedCoordinatesKey = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!mapReady || listingMarkers.length === 0) return;

    const coordinatesKey = listingMarkers
      .map(({ listing, coordinate }) =>
        `${listing._id}:${coordinate.latitude},${coordinate.longitude}`,
      )
      .join("|");
    if (fittedCoordinatesKey.current === coordinatesKey) return;
    fittedCoordinatesKey.current = coordinatesKey;

    const coordinates = listingMarkers.map(({ coordinate }) => coordinate);
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
  }, [listingMarkers, mapReady]);

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
  const { data } = useAutocomplete(
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
  const locations = data?.data.predictions ?? [];
  const showSearch = searchFocused && locations.length > 0 && query.length > 3;

  const sheetRef = useRef<BottomSheet>(null);

  function handleMarkerPress(e: MarkerPressEvent, listing: Listing) {
    setSelectedListingId(listing._id);
    sheetRef.current?.snapToIndex(1);
    e.stopPropagation();
  }

  function dismissSelectedListing() {
    setSelectedListingId(null);
    sheetRef.current?.snapToIndex(0);
  }

  function handleCardPress(listing: Listing) {
    router.push(`/(app)/location/${listing._id}/details`);
  }

  function handleFilterPress() {
    router.push("/(app)/filters")
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
          latitude: 56.337111,
          longitude: -2.795107,
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
          paddingTop: top + 12,
          paddingHorizontal: 12,
          paddingBottom: 12,
        }}
      >
        <Box className="px-10">
          <Box className="w-fit">
            <Input
              variant="rounded"
              className="border border-primary-500 bg-secondary-100"
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
              <Box className="absolute top-12 z-10 w-full px-2">
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
        </Box>

        <Pressable
          onPressIn={handleFilterPress}
          className="absolute bottom-3 right-3 h-10 w-10 items-center justify-center rounded-full border border-primary-500 bg-white"
        >
          <Icon as={Settings2Icon} size="xl" className="text-primary-500" />
        </Pressable>
      </Box>

      <Box className="absolute bottom-7 right-5">
        <Pressable
          className="rounded-full aspect-square bg-primary-500 p-3"
          onPressIn={() => centerLocation()}
        >
          <FocusIcon className="text-white text-xl" color="white" />
        </Pressable>
      </Box>

      <BottomSheet
        snapPoints={["3%", "50%"]}
        topInset={top + 2}
        enableContentPanningGesture={false}
        enableDynamicSizing={false}
        ref={sheetRef}
        onChange={(index) => {
          if (index === 0) setSelectedListingId(null);
        }}
        backgroundStyle={{
          backgroundColor: PROFILE_COLORS.accent,
        }}
        handleStyle={{
          backgroundColor: PROFILE_COLORS.accent,
          borderTopEndRadius: 12,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
      >
        <BottomSheetFlatList<Listing>
          showsVerticalScrollIndicator={false}
          data={selectedListing ? [selectedListing] : []}
          extraData={selectedListingId}
          keyExtractor={(item) => item._id}
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
