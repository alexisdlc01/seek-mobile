import { queryClient } from "@/app/_layout";
import { PROFILE_COLORS } from "@/constants/design";
import { shareListing } from "@/components/links";
import { LikeButton } from "@/components/custom/like-button";
import { Loader } from "@/components/custom/loader";
import { ScrollDots } from "@/components/custom/scroll-dots";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useLike, useUnlike } from "@/hooks/like";
import {
  useAuthRequiredAction,
  useIsAuthenticated,
} from "@/components/custom/auth-required";
import {
  getApplicationControllerGetAllMyApplicationsQueryKey,
  useApplicationControllerCreateApplication,
  useApplicationControllerGetAllMyApplications,
} from "@/src/api/seek-api/application";
import {
  getListingsControllerGetAllVerifiedListingsQueryKey,
  useListingsControllerGetById,
} from "@/src/api/seek-api/listings";
import type {
  DocumentTypesDtoDataItem,
  Listing,
} from "@/src/api/seek-api/model";
import { useUsersControllerDocumentTypes } from "@/src/api/seek-api/users";
import { errorToast } from "@/src/utils/error-toast";
import {
  formatAddress,
  formatAmenity,
  formatFurnishingStatus,
  formatListingDate,
  formatMonthlyRent,
  formatPropertyType,
  normalizeListingToken,
} from "@/src/utils/listing-format";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AlarmSmokeIcon,
  BathIcon,
  BedDoubleIcon,
  BikeIcon,
  Building2Icon,
  CalendarDaysIcon,
  FlowerIcon,
  HouseIcon,
  LucideIcon,
  Maximize2Icon,
  ParkingSquareIcon,
  Share2Icon,
  SofaIcon,
  TvIcon,
  UsersIcon,
  WashingMachineIcon,
  WifiIcon,
} from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  LayoutChangeEvent,
  ScrollView,
  StatusBar,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useListingLiked } from "@/hooks/use-listing-liked";

const APP_BACKGROUND_COLOR = PROFILE_COLORS.background;
const BRAND_COLOR = PROFILE_COLORS.accent;

const DOCUMENT_LABELS: Record<DocumentTypesDtoDataItem, string> = {
  IDENTIFICATION: "Identification",
  PROOF_OF_INCOME: "Proof of income",
  GUARANTOR_AGREEMENT: "Guarantor agreement",
  LANDLORD_REFERENCE: "Landlord reference",
  CHARACTER_REFERENCE: "Character reference",
};

const REQUIRED_DOCUMENT_MATCHERS: [
  DocumentTypesDtoDataItem,
  RegExp,
][] = [
  ["IDENTIFICATION", /identification|passport|national id/i],
  [
    "PROOF_OF_INCOME",
    /proof of income|financial support|student loan|scholarship|savings/i,
  ],
  ["GUARANTOR_AGREEMENT", /guarantor/i],
  ["LANDLORD_REFERENCE", /landlord reference|accommodation (letter|reference)/i],
  ["CHARACTER_REFERENCE", /character reference/i],
];

function getRequiredDocumentTypes(
  requirements: Listing["requirements"] | undefined,
): DocumentTypesDtoDataItem[] {
  if (!Array.isArray(requirements)) return [];

  const documentTypes = requirements.flatMap((requirement) => {
    if (typeof requirement === "string") {
      const match = REQUIRED_DOCUMENT_MATCHERS.find(([, pattern]) =>
        pattern.test(requirement),
      );
      return match ? [match[0]] : [];
    }

    const value = requirement as unknown as {
      name?: unknown;
      desc?: unknown;
      required?: unknown;
    };
    if (!value || typeof value !== "object" || value.required === false) {
      return [];
    }

    const text = [value.name, value.desc]
      .filter((part): part is string => typeof part === "string")
      .join(" ");
    const match = REQUIRED_DOCUMENT_MATCHERS.find(([, pattern]) =>
      pattern.test(text),
    );
    return match ? [match[0]] : [];
  });

  return [...new Set(documentTypes)];
}

export default function DetailsScreen() {
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [savedOverride, setSavedOverride] = useState<boolean | null>(null);
  // This screen stays mounted underneath later routes. Local params prevent a
  // chat's dynamic `id` from being mistaken for a listing id.
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const galleryHeight = Math.min(520, Math.max(390, windowHeight * 0.48));
  const toast = useToast();
  const isAuthenticated = useIsAuthenticated();
  const requireSaveAuth = useAuthRequiredAction("save listings");
  const requireApplyAuth = useAuthRequiredAction("apply for this property");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useListingsControllerGetById(id, {
    query: {
      initialData: () =>
        queryClient
          .getQueryData<Listing[]>(
            getListingsControllerGetAllVerifiedListingsQueryKey(),
          )
          ?.find((listing) => listing._id === id),
    },
  });

  const { mutate: like, isPending: isLiking } = useLike();
  const { mutate: unlike, isPending: isUnliking } = useUnlike();
  const {
    mutate: apply,
    isPending: isApplying,
  } = useApplicationControllerCreateApplication();
  const { data: applications } = useApplicationControllerGetAllMyApplications({
    query: { enabled: isAuthenticated },
  });
  const {
    data: uploadedDocuments,
    isError: documentsError,
    isLoading: isCheckingDocuments,
    refetch: refetchDocuments,
  } = useUsersControllerDocumentTypes({
    query: { enabled: isAuthenticated },
  });
  const hasApplied = Boolean(
    id && applications?.some((application) => application.listing?._id === id),
  );

  const photos = useMemo(
    () => data?.photos?.filter((photo) => Boolean(photo)) ?? [],
    [data?.photos],
  );
  const requiredDocumentTypes = useMemo(
    () => getRequiredDocumentTypes(data?.requirements),
    [data?.requirements],
  );
  const missingDocumentTypes = useMemo(
    () =>
      requiredDocumentTypes.filter(
        (documentType) => !uploadedDocuments?.data.includes(documentType),
      ),
    [requiredDocumentTypes, uploadedDocuments?.data],
  );

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(photos.length > 0 ? "light-content" : "dark-content", true);
      return () => StatusBar.setBarStyle("dark-content", true);
    }, [photos.length]),
  );

  const serverSaved = useListingLiked(data?._id);
  const isSaved = isAuthenticated ? (savedOverride ?? serverSaved) : false;
  const isSaving = isLiking || isUnliking;

  useEffect(() => {
    setSavedOverride(null);
    setImageIndex(0);
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated) setSavedOverride(null);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isError) return;

    errorToast({
      toast,
      data: { message: "Unable to find listing.", statusCode: -1 },
    });
    router.replace("/(app)/(tabs)/map");
  }, [isError, router, toast]);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<string>[] }) => {
      const nextIndex = viewableItems[0]?.index;
      if (typeof nextIndex === "number") setImageIndex(nextIndex);
    },
    [],
  );

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.navigate("/(app)/(tabs)/map");
    }
  }

  function handleShare() {
    if (!data) return;
    void shareListing({ id: data._id, title: data.propertyTitle });
  }

  function handleLike() {
    if (!requireSaveAuth()) return;
    if (!data || isSaving) return;

    const previous = isSaved;
    setSavedOverride(true);
    like(
      { id: data._id },
      {
        onError(error) {
          setSavedOverride(previous);
          errorToast({ toast, data: error.response?.data });
        },
        onSettled() {
          void refetch();
        },
      },
    );
  }

  function handleUnlike() {
    if (!requireSaveAuth()) return;
    if (!data || isSaving) return;

    const previous = isSaved;
    setSavedOverride(false);
    unlike(
      { id: data._id },
      {
        onError(error) {
          setSavedOverride(previous);
          errorToast({ toast, data: error.response?.data });
        },
        onSettled() {
          void refetch();
        },
      },
    );
  }

  function handleApply() {
    if (!requireApplyAuth()) return;
    if (!data || isApplying || hasApplied || isCheckingDocuments) return;

    if (documentsError) {
      Alert.alert(
        "Unable to check documents",
        "Seek needs to verify your uploaded documents before you can apply.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Try Again",
            onPress: () => void refetchDocuments(),
          },
        ],
      );
      return;
    }

    if (missingDocumentTypes.length > 0) {
      const missingDocuments = missingDocumentTypes
        .map((documentType) => DOCUMENT_LABELS[documentType])
        .join(", ");
      Alert.alert(
        "Documents required",
        `Upload the following before applying: ${missingDocuments}.`,
        [
          { text: "Not Now", style: "cancel" },
          {
            text: "Upload Documents",
            onPress: () => router.push("/(app)/personal-info"),
          },
        ],
      );
      return;
    }

    apply(
      { data: { listingId: data._id } },
      {
        onError(error) {
          errorToast({ toast, data: error.response?.data });
        },
        onSuccess() {
          void queryClient.invalidateQueries({
            queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
          });
          router.navigate("/application-successful");
        },
      },
    );
  }

  const regularBedrooms = Math.max(
    0,
    (data?.bedroomsCount ?? 0) - (data?.enSuiteBedroomCount ?? 0),
  );

  return (
    <Box className="flex-1" style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
      <Loader isLoading={isLoading && !data}>
        {data ? (
          <>
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 108 + insets.bottom }}
              showsVerticalScrollIndicator={false}
            >
              <Box
                className="overflow-hidden"
                style={{ height: galleryHeight, backgroundColor: PROFILE_COLORS.surface }}
                onLayout={(event: LayoutChangeEvent) =>
                  setGalleryWidth(event.nativeEvent.layout.width)
                }
              >
                {photos.length > 0 ? (
                  <FlatList
                    data={photos}
                    decelerationRate="fast"
                    disableIntervalMomentum
                    horizontal
                    keyExtractor={(photo, index) => `${photo}-${index}`}
                    onViewableItemsChanged={handleViewableItemsChanged}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="start"
                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 51 }}
                    renderItem={({ item }) => (
                      <Box
                        className="h-full"
                        style={{ width: galleryWidth || windowWidth }}
                      >
                        <Image
                          alt="Property photo"
                          resizeMode="cover"
                          size="full"
                          source={{ uri: item }}
                        />
                      </Box>
                    )}
                  />
                ) : (
                  <Box
                    className="h-full w-full items-center justify-center"
                    style={{ backgroundColor: PROFILE_COLORS.surface }}
                  >
                    <Building2Icon color="#525252" size={64} />
                    <Text className="mt-3 font-medium text-neutral-700">
                      No photos available
                    </Text>
                  </Box>
                )}

                <Box className="absolute bottom-12 left-0 right-0" pointerEvents="none">
                  <ScrollDots
                    activeColor="#FFFFFF"
                    inactiveColor="rgba(255,255,255,0.48)"
                    total={photos.length}
                    value={imageIndex}
                  />
                </Box>

                {photos.length > 0 ? (
                  <Box className="absolute bottom-11 right-4 rounded-full bg-black/55 px-3 py-1.5">
                    <Text className="text-xs font-semibold text-white">
                      {imageIndex + 1} / {photos.length}
                    </Text>
                  </Box>
                ) : null}
              </Box>

              <VStack
                className="-mt-7 gap-7 rounded-t-[32px] px-5 pb-8 pt-7"
                style={{ backgroundColor: APP_BACKGROUND_COLOR }}
              >
                <VStack className="gap-3">
                  <Text className="text-3xl font-bold leading-9 text-primary-500">
                    {data.propertyTitle}
                  </Text>
                  <Text className="text-base leading-6 text-neutral-600">
                    {formatAddress(data)}
                  </Text>
                  <Text className="pt-1 text-2xl font-bold text-primary-500">
                    {formatMonthlyRent(data.monthlyRent)}
                  </Text>
                </VStack>

                <HStack className="gap-2">
                  <QuickStat
                    icon={BedDoubleIcon}
                    label={`${data.bedroomsCount} ${data.bedroomsCount === 1 ? "bed" : "beds"}`}
                  />
                  <QuickStat
                    icon={BathIcon}
                    label={`${data.bathrooms} ${data.bathrooms === 1 ? "bath" : "baths"}`}
                  />
                  <QuickStat icon={Maximize2Icon} label={`${data.sizeSqMeters} m²`} />
                  <QuickStat icon={UsersIcon} label={`${data.numOfPeople} max`} />
                </HStack>

                {data.propertyDesc?.trim() ? (
                  <Section title="About this home">
                    <Text className="text-base leading-6 text-neutral-700">
                      {data.propertyDesc.trim()}
                    </Text>
                  </Section>
                ) : null}

                <Section title="Property details">
                  <Box className="flex-row flex-wrap justify-between gap-y-3">
                    <DetailItem
                      icon={HouseIcon}
                      label="Property type"
                      value={formatPropertyType(data.propertyType)}
                    />
                    <DetailItem
                      icon={BedDoubleIcon}
                      label="Bedrooms"
                      value={`${regularBedrooms} regular • ${data.enSuiteBedroomCount} ensuite`}
                    />
                    <DetailItem
                      icon={Building2Icon}
                      label="Deposit"
                      value={`£${new Intl.NumberFormat("en-GB").format(data.securityDeposit)}`}
                    />
                    <DetailItem
                      icon={SofaIcon}
                      label="Furnishing"
                      value={formatFurnishingStatus(data.furnishingStatus)}
                    />
                    <DetailItem
                      icon={AlarmSmokeIcon}
                      label="EPC rating"
                      value={data.epcRating || "Not specified"}
                    />
                    <DetailItem
                      icon={CalendarDaysIcon}
                      label="Available from"
                      value={formatListingDate(data.availableFrom)}
                    />
                  </Box>
                </Section>

                {data.amenities?.length > 0 ? (
                  <Section title="Amenities">
                    {/* Wrap rather than scroll sideways, so every amenity is visible. */}
                    <Box className="flex-row flex-wrap justify-between gap-y-3">
                      {data.amenities.map((amenity, index) => (
                        <AmenityInfo
                          amenity={amenity}
                          key={`${amenity}-${index}`}
                        />
                      ))}
                    </Box>
                  </Section>
                ) : null}
              </VStack>
            </ScrollView>

            <HStack
              className="absolute left-0 right-0 z-30 items-center justify-between px-4"
              pointerEvents="box-none"
              style={{ top: insets.top + 10 }}
            >
              <Pressable
                accessibilityLabel="Go back"
                accessibilityRole="button"
                className="h-12 w-12 items-center justify-center rounded-full bg-primary-500/90"
                hitSlop={8}
                onPress={handleBack}
              >
                <Icon as={ArrowLeftIcon} className="text-white" size="xl" />
              </Pressable>

              <HStack className="gap-2">
                <Pressable
                  accessibilityLabel="Share listing"
                  accessibilityRole="button"
                  className="h-12 w-12 items-center justify-center rounded-full bg-primary-500/90"
                  hitSlop={8}
                  onPress={handleShare}
                >
                  <Share2Icon color="white" size={23} />
                </Pressable>
                <LikeButton
                  activeColor="white"
                  containerClassName="h-12 w-12 bg-primary-500/90 p-0"
                  disabled={isSaving}
                  iconColor="white"
                  like={handleLike}
                  liked={isSaved}
                  size={24}
                  unlike={handleUnlike}
                />
              </HStack>
            </HStack>

            <HStack
              className="absolute bottom-0 left-0 right-0 border-t border-black/10 px-4 pt-3"
              style={{
                backgroundColor: APP_BACKGROUND_COLOR,
                paddingBottom: Math.max(insets.bottom, 12),
              }}
            >
              <Button
                className="h-14 flex-1 rounded-full bg-primary-500"
                disabled={isApplying || hasApplied || isCheckingDocuments}
                onPress={handleApply}
              >
                <ButtonText className="font-bold text-white">
                  {!isAuthenticated
                    ? "Sign Up to Apply"
                    : hasApplied
                    ? "Applied"
                    : isCheckingDocuments
                      ? "Checking documents…"
                      : isApplying
                        ? "Applying…"
                        : "Apply Now"}
                </ButtonText>
              </Button>
            </HStack>
          </>
        ) : null}
      </Loader>
    </Box>
  );
}

type QuickStatProps = {
  icon: LucideIcon;
  label: string;
};

function QuickStat({ icon: StatIcon, label }: QuickStatProps) {
  return (
    <VStack
      className="flex-1 items-center gap-2 rounded-2xl px-1 py-3"
      style={{ backgroundColor: PROFILE_COLORS.surface }}
    >
      <StatIcon color={BRAND_COLOR} size={21} />
      <Text className="text-center text-xs font-semibold text-black">{label}</Text>
    </VStack>
  );
}

type SectionProps = React.PropsWithChildren<{ title: string }>;

function Section({ title, children }: SectionProps) {
  return (
    <VStack className="gap-3">
      <Text className="text-xl font-bold text-primary-500">{title}</Text>
      {children}
    </VStack>
  );
}

type DetailItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function DetailItem({ icon: DetailIcon, label, value }: DetailItemProps) {
  return (
    <VStack
      className="gap-2 rounded-2xl p-4"
      style={{ backgroundColor: PROFILE_COLORS.surface, width: "48.5%" }}
    >
      <HStack className="items-center gap-2">
        <DetailIcon color={BRAND_COLOR} size={18} />
        <Text className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </Text>
      </HStack>
      <Text className="text-sm font-semibold leading-5 text-black">{value}</Text>
    </VStack>
  );
}

const AMENITY_ICONS: Record<string, LucideIcon> = {
  bike_storage: BikeIcon,
  dishwasher: WashingMachineIcon,
  dryer: WashingMachineIcon,
  garden: FlowerIcon,
  parking: ParkingSquareIcon,
  smoke_alarm: AlarmSmokeIcon,
  tv: TvIcon,
  washing_machine: WashingMachineIcon,
  wifi: WifiIcon,
  wi_fi: WifiIcon,
};

function AmenityInfo({ amenity }: { amenity: string }) {
  const AmenityIcon = AMENITY_ICONS[normalizeListingToken(amenity)] ?? HouseIcon;

  return (
    <HStack
      className="items-center gap-3 rounded-2xl px-4 py-3"
      style={{ backgroundColor: PROFILE_COLORS.surface, width: "48.5%" }}
    >
      <AmenityIcon color={BRAND_COLOR} size={20} />
      <Text className="flex-1 text-sm font-medium text-black">
        {formatAmenity(amenity)}
      </Text>
    </HStack>
  );
}
