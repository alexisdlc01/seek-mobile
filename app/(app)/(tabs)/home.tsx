import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PROFILE_COLORS } from "@/constants/design";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
} from "react-native";
import { Listing } from "@/src/api/seek-api/model";
import { Box } from "@/components/ui/box";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon, Settings2Icon, Share2Icon, UsersIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack/index";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useListingsControllerGetFilteredListings } from "@/src/api/seek-api/listings";
import { RefreshControl } from "react-native-gesture-handler";
import { ScrollDots } from "@/components/custom/scroll-dots";
import { Text } from "@/components/ui/text"
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { LikeButton } from "@/components/custom/like-button";
import { useLike, useUnlike } from "@/hooks/like";
import { shareListing } from "@/components/links";
import { getActiveFilters, useFilterStore } from "@/src/store/filter-store";
import { useFocusEffect } from "@react-navigation/native";
import { formatMonthlyRent } from "@/src/utils/listing-format";
import { useAuthRequiredAction } from "@/components/custom/auth-required";
import { useListingLiked } from "@/hooks/use-listing-liked";

const APP_BACKGROUND_COLOR = PROFILE_COLORS.background;

export default function HomeScreen() {
  const filters = useFilterStore(state => state.data);
  const clearFilters = useFilterStore(state => state.clear);
  const activeFilters = useMemo(() => getActiveFilters(filters), [filters]);
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const {
    refetch,
    data: listings,
    isLoading,
    isError,
  } = useListingsControllerGetFilteredListings(activeFilters);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);

  const bottomBarHeight = useBottomTabBarHeight();
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const top = useSafeAreaInsets().top;

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content", true);
      return () => StatusBar.setBarStyle("dark-content", true);
    }, []),
  );

  async function handleRefresh() {
    setIsPullRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsPullRefreshing(false);
    }
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isPullRefreshing}
          onRefresh={handleRefresh}
          progressViewOffset={top}
        />
      }
      ListEmptyComponent={
        <Box
          className="flex-1 items-center justify-center gap-4 px-6"
          style={{ backgroundColor: APP_BACKGROUND_COLOR }}
        >
          <Text className="text-center text-lg font-semibold text-primary-500">
            {isLoading
              ? "Loading listings..."
              : isError
                ? "Unable to load listings."
                : "No listings match these filters."}
          </Text>
          {!isLoading && !isError && hasActiveFilters && (
            <Pressable
              onPress={clearFilters}
              className="rounded-full bg-primary-500 px-6 py-3"
            >
              <Text className="font-semibold text-white">Clear filters</Text>
            </Pressable>
          )}
        </Box>
      }
      data={listings ?? []}
      className="min-h-full"
      pagingEnabled
      disableIntervalMomentum
      directionalLockEnabled={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      snapToInterval={SCREEN_HEIGHT - bottomBarHeight}
      snapToAlignment="start"
      decelerationRate={0.9}
      getItemLayout={(_, index) => ({
        length: SCREEN_HEIGHT - bottomBarHeight,
        offset: (SCREEN_HEIGHT - bottomBarHeight) * index,
        index,
      })}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ListingScrollItem listing={item} />
      )}
    />
  );
}

type ListingScrollItemProps = {
  listing: Listing;
};

function ListingScrollItem({ listing }: ListingScrollItemProps) {
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
    Dimensions.get("window");
  const bottomBarHeight = useBottomTabBarHeight();
  const height = SCREEN_HEIGHT - bottomBarHeight;
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showLikeFeedback, setShowLikeFeedback] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const requireAuth = useAuthRequiredAction("save listings");
  const { mutate: like } = useLike();
  const liked = useListingLiked(listing._id);
  const singleTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (singleTapTimer.current) clearTimeout(singleTapTimer.current);
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  function showHeartFeedback() {
    setShowLikeFeedback(true);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => {
      setShowLikeFeedback(false);
      feedbackTimer.current = null;
    }, 650);
  }

  function handleDoubleTap() {
    if (!requireAuth()) return;

    showHeartFeedback();
    if (liked) return;

    like(
      { id: listing._id },
      {
        onError(error) {
          toast.show({
            placement: "top",
            render: (props) => (
              <ErrorToast {...props} error={error.response?.data} />
            ),
          });
        },
      },
    );
  }

  function handleImagePress() {
    if (singleTapTimer.current) {
      clearTimeout(singleTapTimer.current);
      singleTapTimer.current = null;
      handleDoubleTap();
      return;
    }

    singleTapTimer.current = setTimeout(() => {
      singleTapTimer.current = null;
      router.push(`/(app)/location/${listing._id}/details`);
    }, 260);
  }

  return (
    <Box
      style={{
        height: height,
      }}
    >
      <FlatList
        data={listing.photos}
        pagingEnabled
        disableIntervalMomentum
        directionalLockEnabled={true}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 51,
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length === 0) {
            return;
          }
          setImageIndex(viewableItems[0].index ?? 0);
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="start"
        decelerationRate={0.9}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            accessibilityHint="Double tap to like"
            accessibilityLabel={`Open ${listing.propertyTitle}`}
            accessibilityRole="button"
            onPress={handleImagePress}
            style={{
              height: "100%",
              width: SCREEN_WIDTH,
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </Pressable>
        )}
      />
      <Overlay data={listing} imageIndex={imageIndex} />
      {showLikeFeedback ? (
        <Box
          className="absolute inset-0 items-center justify-center"
          pointerEvents="none"
        >
          <Box className="h-24 w-24 items-center justify-center rounded-full bg-black/30">
            <HeartIcon color="white" fill="white" size={58} strokeWidth={2} />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

type OverlayProps = {
  data: Listing;
  imageIndex: number;
};

function Overlay({ data: listing, imageIndex }: OverlayProps) {
  const { top } = useSafeAreaInsets();
  const [width, setWidth] = useState<number>(0);

  return (
    <Box
      className="absolute h-full w-full bg-transparent"
      pointerEvents="box-none"
    >
      <LinearGradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.78)",
          PROFILE_COLORS.surface,
        ]}
        locations={[0, 0.58, 1]}
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          left: 0,
          height: "38%",
        }}
      />
      <Box
        className="h-full w-full flex-row px-4"
        pointerEvents="box-none"
        style={{ paddingTop: top }}
      >
        <Box className="flex flex-1 justify-end gap-2 py-4">
          <Box>
            <Text className="text-2xl font-bold text-primary-500">
              {listing.propertyTitle}
            </Text>
            <Text className="text-sm text-primary-500">
              {listing.streetAddress}
            </Text>
            <Text className="text-sm text-primary-500">
              {formatMonthlyRent(listing.monthlyRent)}
            </Text>
            <Box className="flex flex-row">
              <Box
                className="flex-row items-end gap-1"
                onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
              >
                <UsersIcon color={PROFILE_COLORS.accent} size={20} />
                <Text className="text-sm text-primary-500">
                  {listing.numOfPeople ?? 0}
                </Text>
              </Box>
              <Box className="flex-1 justify-center">
                <ScrollDots
                  activeColor={PROFILE_COLORS.accent}
                  inactiveColor="rgba(11,42,91,0.14)"
                  total={listing.photos.length}
                  value={imageIndex}
                />
              </Box>
              <Box style={{ width }} />
            </Box>
          </Box>
        </Box>
        <Box className="h-full w-fit py-4">
          <ActionBar data={listing} />
        </Box>
      </Box>
    </Box>
  );
}

type ActionBarProps = {
  data: Listing;
};

function ActionBar({ data }: ActionBarProps) {
  const router = useRouter();
  const toast = useToast();
  const requireAuth = useAuthRequiredAction("save listings");
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  async function handleUnlike() {
    if (!requireAuth()) return;

    unlike({ id: data._id }, {
      onError(error) {
        toast.show({
          render: (props) => (
            <ErrorToast {...props} error={error.response?.data} />
          )
        })
      }
    });
  }

  async function handleLike() {
    if (!requireAuth()) return;

    like({ id: data._id }, {
      onError(error) {
        toast.show({
          render: (props) => (
            <ErrorToast {...props} error={error.response?.data} />
          )
        })
      }
    });
  }

  const liked = useListingLiked(data._id);


  function handleShare() {
    void shareListing({ id: data._id, title: data.propertyTitle });
  }

  return (
    <VStack className="flex flex-1 flex-col justify-between items-center">
      <Pressable
        accessibilityLabel="Open listing filters"
        accessibilityRole="button"
        className="h-[51px] w-[51px] items-center justify-center rounded-full border border-primary-500/10 bg-white shadow-hard-5"
        hitSlop={10}
        onPress={() => router.navigate("/(app)/filters")}
      >
        <Settings2Icon color={PROFILE_COLORS.accent} size={35} />
      </Pressable>
      <VStack className="items-center gap-4">
        <LikeButton
          activeColor={PROFILE_COLORS.accent}
          containerClassName="h-[51px] w-[51px] border border-primary-500/10 bg-white p-0 shadow-hard-5"
          iconColor={PROFILE_COLORS.accent}
          like={handleLike}
          liked={liked}
          unlike={handleUnlike}
        />
        <Pressable
          accessibilityLabel="Share listing"
          accessibilityRole="button"
          onPress={handleShare}
          hitSlop={10}
          className="h-[51px] w-[51px] items-center justify-center rounded-full border border-primary-500/10 bg-white shadow-hard-5"
        >
          <Share2Icon color={PROFILE_COLORS.accent} size={35} />
        </Pressable>
      </VStack>
      <Box />
    </VStack>
  );
}

// <Avatar className="overflow-hidden">
//   <Image
//     source={{ uri: "https://picsum.photos/200" }}
//     placeholderContentFit="cover"
//     contentFit="cover"
//     transition={200}
//     style={{ width: "100%", height: "100%" }}
//     placeholder={require("@/assets/images/avatar.jpg")}
//   />
// </Avatar>
//
