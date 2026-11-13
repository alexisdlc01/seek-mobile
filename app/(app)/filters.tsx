import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { CheckIcon, Icon } from "@/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack/index";
import { HStack } from "@/components/ui/hstack";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { SelectBoxInput } from "@/components/custom/select-box-input";
import { PeopleInput } from "@/components/custom/people-input";
import { useFilterStore } from "@/src/store/filter-store";
import { ListingsControllerGetFilteredListingsPropertyType } from "@/src/api/seek-api/model";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";

const MAX_MONTHLY_RENT = 5000;

const PROPERTY_TYPES = [
  { label: "Any", value: "" },
  { label: "Flat / apartment", value: "FLAT_APARTMENT" },
  { label: "House", value: "HOUSE" },
  { label: "Room in shared house", value: "ROOM_IN_SHARED_HOUSE" },
  { label: "Studio", value: "STUDIO" },
  { label: "Other", value: "OTHER" },
];

// Values must match exactly what the website's listing form saves.
const ALL_AMENITIES = [
  { label: "Wi-Fi", value: "Wi-Fi" },
  { label: "Washing machine", value: "Washing Machine" },
  { label: "Dryer", value: "Dryer" },
  { label: "Dishwasher", value: "Dishwasher" },
  { label: "Pets allowed", value: "Pets Allowed" },
  { label: "Bike storage", value: "Bike Storage" },
  { label: "Parking", value: "Parking" },
  { label: "Garden", value: "Garden" },
  { label: "Smoke alarm", value: "Smoke Alarm" },
  { label: "Fireplace", value: "Fireplace" },
  { label: "Carbon monoxide alarm", value: "Monoxide Alarm" },
];

export default function Filters() {
  const router = useRouter();

  const { data, setValue, clear } = useFilterStore();
  const {
    amenities,
    monthlyRentMax,
    numOfPeople,
    propertyType,
  } = data;
  const committedMonthlyRentMax = Math.min(
    MAX_MONTHLY_RENT,
    Math.max(0, monthlyRentMax ?? 0),
  );
  const [monthlyRentDraft, setMonthlyRentDraft] = useState(
    committedMonthlyRentMax,
  );

  useEffect(() => {
    setMonthlyRentDraft(committedMonthlyRentMax);
  }, [committedMonthlyRentMax]);

  const setPropertyType = (value: string) => {
    setValue("propertyType")(
      (value || undefined) as ListingsControllerGetFilteredListingsPropertyType | undefined,
    );
  };

  const monthlyRentLabel = monthlyRentDraft === 0
    ? "Any price"
    : `Up to £${monthlyRentDraft.toLocaleString("en-GB")}`;

  return (
    <SafeAreaView className="flex-1 bg-background-screen">
      <Box className="px-6 pb-3 pt-4">
        <Box className="h-10 items-center justify-center">
          <Pressable
            className="absolute left-2 h-10 w-10 items-center justify-center rounded-full"
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <Icon as={ArrowLeft} size="xl" />
          </Pressable>
          <Text bold size="2xl" className="text-primary-500">
            Filters
          </Text>
          <Pressable
            className="absolute right-2 h-10 justify-center px-2"
            onPress={clear}
            accessibilityRole="button"
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <Text className="font-semibold text-primary-600">Reset</Text>
          </Pressable>
        </Box>
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48 }}
      >
        <VStack className="gap-7 pt-3">
          {/* People */}
          <PeopleInput value={numOfPeople ?? 0} onChange={setValue("numOfPeople")} />

          {/* Price Slider */}
          <Box className="gap-3">
            <HStack className="items-center justify-between">
              <Text size="lg" className="font-semibold text-primary-500">
                Price per month
              </Text>
              <Text className="font-semibold text-primary-600">
                {monthlyRentLabel}
              </Text>
            </HStack>
            <Box className="px-2 py-2">
              <Slider
                size="lg"
                minValue={0}
                maxValue={MAX_MONTHLY_RENT}
                step={50}
                onChange={setMonthlyRentDraft}
                onChangeEnd={(value) => setValue("monthlyRentMax")(value)}
                value={monthlyRentDraft}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Box>

          {/* Property Type */}
          <Box className="gap-3">
            <Text size="lg" className="font-semibold text-primary-500">
              Property type
            </Text>
            <SelectBoxInput
              options={PROPERTY_TYPES}
              value={propertyType ?? ""}
              onChange={setPropertyType}
            />
          </Box>

          {/* Amenities */}
          <Box className="gap-3">
            <Text size="lg" className="font-semibold text-primary-500">
              Amenities
            </Text>
            <CheckboxGroup
              className="flex-row flex-wrap"
              value={amenities ?? []}
              onChange={setValue("amenities")}
            >
              {ALL_AMENITIES.map((amenity) => (
                <Checkbox
                  value={amenity.value}
                  key={amenity.value}
                  size="md"
                  className="w-1/2 py-2 pr-3"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="flex-1 text-sm text-typography-950">
                    {amenity.label}
                  </CheckboxLabel>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
