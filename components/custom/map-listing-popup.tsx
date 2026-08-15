import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { Listing } from "@/src/api/seek-api/model";
import {
  formatAddress,
  formatMonthlyRent,
} from "@/src/utils/listing-format";
import { UsersIcon } from "lucide-react-native";
import { PROFILE_COLORS } from "@/constants/design";

type MapListingPopupProps = {
  listing: Listing;
};

export function MapListingPopup({ listing }: MapListingPopupProps) {
  return (
    <VStack className="gap-3 bg-[#F2F2F2] px-5 pb-8 pt-2">
      <Text className="text-2xl font-bold leading-7 text-primary-500">
        {listing.propertyTitle || "Untitled property"}
      </Text>
      <Text className="text-sm leading-5 text-neutral-600">
        {formatAddress(listing)}
      </Text>
      <HStack className="items-center justify-between gap-4 pt-1">
        <Text className="text-lg font-bold text-primary-500">
          {formatMonthlyRent(listing.monthlyRent)}
        </Text>
        <HStack className="items-center gap-2">
          <UsersIcon color={PROFILE_COLORS.accent} size={19} strokeWidth={2.4} />
          <Text className="text-lg font-bold text-primary-500">
            {listing.numOfPeople ?? "—"}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}
