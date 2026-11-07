import { shareListing } from "@/components/links";
import { BackButton } from "@/components/custom/back-button";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { LikeButton } from "@/components/custom/like-button";
import { ListingCard } from "@/components/custom/listing-card";
import { ShareButton } from "@/components/custom/share-button";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { useLike, useUnlike } from "@/hooks/like";
import { useApplicationControllerGetAllMyApplications } from "@/src/api/seek-api/application";
import { useListingsControllerGetLiked } from "@/src/api/seek-api/listings";
import type { Listing } from "@/src/api/seek-api/model";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { useListingLiked } from "@/hooks/use-listing-liked";

type TriggerProps = {
  isExpanded: boolean;
};

export default function SavedListings() {
  return (
    <AuthRequiredScreen
      title="Sign up to save homes"
      description="Create an account to keep a shortlist and track your applications."
    >
      <AuthenticatedSavedListings />
    </AuthRequiredScreen>
  );
}

function AuthenticatedSavedListings() {
  const colors = useSeekTheme();
  const { data: liked } = useListingsControllerGetLiked();
  const { data: applied } = useApplicationControllerGetAllMyApplications();

  return (
    <SafeAreaView
      className="h-full px-6"
      style={{ backgroundColor: colors.background }}
    >
      <BackButton title="Saved homes" fallbackHref="/(app)/(tabs)/map" />
      <Accordion className="bg-transparent" type="single" variant="unfilled">
        <AccordionItem value="liked">
          <AccordionHeader>
            <AccordionTrigger className="mb-3 rounded-full bg-transparent px-2 py-4">
              {({ isExpanded }: TriggerProps) => (
                <CustomTriggerInner isExpanded={isExpanded} title="Liked" />
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="gap-4 px-0 pt-4">
            <FlatList
              contentContainerClassName="gap-3"
              data={liked?.data ?? []}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <SavedListingCard data={item} />}
              ListEmptyComponent={<EmptyState text="No liked listings yet" />}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="applications">
          <AccordionHeader>
            <AccordionTrigger className="mb-3 rounded-full bg-transparent px-2 py-4">
              {({ isExpanded }: TriggerProps) => (
                <CustomTriggerInner
                  isExpanded={isExpanded}
                  title="Applications"
                />
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="gap-4 px-0 pt-4">
            <FlatList
              contentContainerClassName="gap-3"
              data={applied ?? []}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <SavedListingCard data={item.listing} />
              )}
              ListEmptyComponent={<EmptyState text="No applications yet" />}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SafeAreaView>
  );
}

type CustomTriggerInnerProps = {
  isExpanded: boolean;
  title: string;
};

function CustomTriggerInner({ isExpanded, title }: CustomTriggerInnerProps) {
  return (
    <>
      <AccordionTitleText className="text-2xl font-semibold text-primary-500">
        {title}
      </AccordionTitleText>
      <AccordionIcon
        as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
        className="text-primary-500"
      />
    </>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <Box className="rounded-3xl border border-primary-500 bg-transparent p-6">
      <Text className="text-center text-lg font-medium text-primary-500">{text}</Text>
    </Box>
  );
}

type SavedListingCardProps = {
  data: Listing;
};

function SavedListingCard({ data }: SavedListingCardProps) {
  const colors = useSeekTheme();
  const { mutate: like, isPending: isLiking } = useLike();
  const { mutate: unlike, isPending: isUnliking } = useUnlike();
  const toast = useToast();
  const liked = useListingLiked(data._id);

  async function handleUnlike() {
    unlike(
      { id: data._id },
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

  async function handleLike() {
    like(
      { id: data._id },
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

  async function handleShare() {
    await shareListing({ id: data._id, title: data.propertyTitle });
  }

  return (
    <ListingCard
      data={data}
      left={
        <HStack className="items-center gap-1">
          <LikeButton
            activeColor={colors.accent}
            containerClassName="bg-transparent"
            disabled={isLiking || isUnliking}
            iconColor={colors.accent}
            like={handleLike}
            liked={liked}
            size={21}
            unlike={handleUnlike}
          />
          <ShareButton
            containerClassName="bg-transparent"
            iconColor={colors.accent}
            share={handleShare}
            size={21}
          />
        </HStack>
      }
    />
  );
}
