import { Listing } from "@/src/api/seek-api/model";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FlatList, LayoutChangeEvent, Pressable, StyleSheet, Text as RNText, View } from "react-native";
import { Badge, SeekButton } from "@/components/seek/ui";
import type { Match } from "@/src/utils/listing-match";
import { Box } from "../ui/box";
import { ShareIcon } from "lucide-react-native";
import { useState } from "react";
import { ScrollDots } from "./scroll-dots";
import { useRouter } from "expo-router";
import { useLike, useUnlike } from "@/hooks/like";
import { useListingLiked } from "@/hooks/use-listing-liked";
import { useToast } from "../ui/toast";
import { ErrorToast } from "./error-toast";
import { LikeButton } from "./like-button";
import { shareListing } from "../links";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthRequiredAction } from "./auth-required";

function handleShare(listing: Listing) {
  return shareListing({ id: listing._id, title: listing.propertyTitle });
}

export type ListingCardProps = {
  data: Listing;
  left: React.ReactNode;
};

export function ListingCard({ data, left }: ListingCardProps) {
  const router = useRouter();

  return (
    <Card variant="ghost" className="rounded-3xl border border-primary-500 bg-transparent p-3">
      <HStack className="w-full items-center justify-between">
        <Pressable
          accessibilityLabel={`Open ${data.propertyTitle}`}
          accessibilityRole="button"
          className="flex-1"
          onPress={() => router.navigate(`/(app)/location/${data._id}/details`)}
        >
          <HStack className="gap-4 flex-1">
            <Image
              className="h-24 w-24 rounded-2xl"
              alt="listing image"
              source={{
                uri: data.photos?.at(0) ?? "https://picsum.photos/200",
              }}
            />
            <VStack className="gap-1 flex-1 justify-center">
              <Text className="text-lg font-bold text-primary-500 overflow-ellipsis line-clamp-1">
                {data.propertyTitle}
              </Text>
              <Text className="text-sm text-typography-700 line-clamp-1">{data.streetAddress}</Text>
              <Text className="text-base font-semibold text-primary-500">£{data.monthlyRent} pcm</Text>
            </VStack>
          </HStack>
        </Pressable>
        <Box className="pl-2">{left}</Box>
      </HStack>
    </Card>
  );
}

export type VerticalListingCardProps = {
  data: Listing;
  onPress?: () => void;
  /** Match % and the reason line, shown with an Apply button. */
  match?: Match;
  onApply?: () => void;
};

export function VerticalListingCard({
  data,
  onPress,
  match,
  onApply,
}: VerticalListingCardProps) {
  const colors = useSeekTheme();
  const requireAuth = useAuthRequiredAction("save listings");
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();
  const toast = useToast();
  const liked = useListingLiked(data._id);

  async function handleUnlike() {
    if (!requireAuth()) return;

    console.log("UNLIKE TRIGGERED")
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

    console.log("LIKE TRIGGERED")
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


  const [imageIndex, setImageIndex] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState<number>(0);
  const onLayout = (e: LayoutChangeEvent) => {
    setParentWidth(e.nativeEvent.layout.width);
  };

  return (
    <Card className="bg-transparent px-4 pb-5">
      <VStack className="justify-between">
        <Pressable
          onPress={onPress}
          onLayout={onLayout}
          className="overflow-hidden rounded-t-3xl"
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            disableIntervalMomentum
            snapToAlignment="start"
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 51,
            }}
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems.length === 0) {
                return;
              }
              setImageIndex(viewableItems[0].index ?? 0);
            }}
            data={data.photos}
            decelerationRate={0.9}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Box
                style={{
                  width: parentWidth,
                }}
              >
                <Image
                  className="w-full h-[220px]"
                  alt="listing image"
                  source={{
                    uri: item,
                  }}
                />
              </Box>
            )}
          />
          <Box className="absolute w-full bottom-2">
            <ScrollDots total={data.photos.length} value={imageIndex} />
          </Box>
        </Pressable>
        <HStack className={match || onApply ? "bg-primary-0 px-4 py-3" : "rounded-b-3xl bg-primary-0 px-4 py-3"}>
          <VStack className="flex-1">
            <Text className="text-lg font-bold text-primary-500">
              {data.propertyTitle}
            </Text>
            <Text className="text-sm text-typography-700">{data.streetAddress}</Text>
            <Text className="text-sm font-semibold text-primary-500">
              {match && data.numOfPeople > 1
                ? `£${Math.round(data.monthlyRent / data.numOfPeople)} pcm each`
                : `£${data.monthlyRent} pcm`}
              {match ? (data.billsIncluded ? " · bills incl." : " · bills extra") : ""}
            </Text>
          </VStack>
          <HStack className="gap-2">
            <LikeButton unlike={handleUnlike}
              size={24}
              like={handleLike}
              liked={liked} />
            <Box className="items-center justify-center rounded-full bg-primary-0 p-2">
              <ShareIcon
                onPress={() => void handleShare(data)}
                color={colors.accent}
                size={24}
              />
            </Box>
          </HStack>
        </HStack>
        {match || onApply ? (
          <View style={[styles.matchRow, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <View style={styles.matchText}>
              {match ? <Badge label={`${match.percent}% match`} tone="info" /> : null}
              {match ? (
                <RNText numberOfLines={2} style={[styles.why, { color: colors.mutedText }]}>
                  {match.why}
                </RNText>
              ) : null}
            </View>
            {onApply ? (
              <SeekButton
                label="Apply"
                compact
                onPress={onApply}
                accessibilityLabel={`Apply to ${data.propertyTitle}`}
              />
            ) : null}
          </View>
        ) : null}
      </VStack>
    </Card>
  );
}

const styles = StyleSheet.create({
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  matchText: { flex: 1, gap: 4, alignItems: "flex-start" },
  why: { fontSize: 12.5, lineHeight: 17 },
});
