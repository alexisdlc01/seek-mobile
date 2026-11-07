import { useIsAuthenticated } from "@/components/custom/auth-required";
import { SeekButton } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useUsersControllerGetPassport } from "@/src/api/seek-api/users";
import { getActiveFilters, useFilterStore } from "@/src/store/filter-store";
import { useQuickFilters } from "@/src/store/quick-filter-store";
import { nextSeptember, type MatchPrefs } from "@/src/utils/listing-match";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const BUDGET = 750;
const BEDROOMS = 4;

/** What the student asked for, as the inputs of the match estimate. */
export function useMatchPrefs(): MatchPrefs {
  const filters = useFilterStore((state) => state.data);
  const fromSeptember = useQuickFilters((state) => state.fromSeptember);
  return useMemo(() => {
    const active = getActiveFilters(filters);
    return {
      maxRent: active.maxRent,
      minBedrooms: active.minBedrooms,
      billsIncluded: active.billsIncluded,
      moveInBy: fromSeptember ? nextSeptember() : null,
    };
  }, [filters, fromSeptember]);
}

/** Opens the Apply screen for a home. */
export function useApplyToListing() {
  const router = useRouter();
  return (listingId: string) =>
    router.push({ pathname: "/(app)/apply", params: { listingId } });
}

/** Under £750, Bills incl., 4+ beds, From Sept: the quick filters of the Find screen. */
export function QuickFilterChips() {
  const colors = useSeekTheme();
  const filters = useFilterStore((state) => state.data);
  const setValue = useFilterStore((state) => state.setValue);
  const fromSeptember = useQuickFilters((state) => state.fromSeptember);
  const toggleFromSeptember = useQuickFilters((state) => state.toggleFromSeptember);

  const chips = [
    {
      label: `Under £${BUDGET}`,
      on: filters.maxRent === BUDGET,
      toggle: () => setValue("maxRent")(filters.maxRent === BUDGET ? undefined : BUDGET),
    },
    {
      label: "Bills incl.",
      on: filters.billsIncluded === true,
      toggle: () => setValue("billsIncluded")(filters.billsIncluded ? undefined : true),
    },
    {
      label: `${BEDROOMS}+ beds`,
      on: filters.minBedrooms === BEDROOMS,
      toggle: () => setValue("minBedrooms")(filters.minBedrooms === BEDROOMS ? undefined : BEDROOMS),
    },
    { label: "From Sept", on: fromSeptember, toggle: toggleFromSeptember },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chips}
      keyboardShouldPersistTaps="handled"
    >
      {chips.map((chip) => (
        <Pressable
          key={chip.label}
          accessibilityRole="button"
          accessibilityState={{ selected: chip.on }}
          onPress={chip.toggle}
          style={[
            styles.chip,
            {
              backgroundColor: chip.on ? colors.primary : colors.surface,
              borderColor: chip.on ? colors.primary : colors.line,
            },
          ]}
        >
          <Text style={[styles.chipText, { color: chip.on ? colors.onPrimary : colors.text }]}>
            {chip.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

/** "Seek Passport 3 of 4. Add a guarantor to apply in one tap." with a Finish button. */
export function PassportBanner() {
  const colors = useSeekTheme();
  const router = useRouter();
  const signedIn = useIsAuthenticated();
  const passport = useUsersControllerGetPassport({ query: { enabled: signedIn } });
  const data = passport.data;
  if (!signedIn || !data) return null;

  const labelOf = (type: string) =>
    data.sections.flatMap((section) => section.items).find((item) => item.type === type)?.label ??
    type.replace(/_/g, " ").toLowerCase();
  const nextMissing = data.missingRequired[0];

  return (
    <View style={[styles.banner, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <Text style={[styles.bannerText, { color: colors.text }]}>
        <Text style={styles.bannerStrong}>Seek Passport </Text>
        {data.completed} of {data.total}.{" "}
        {data.ready || nextMissing === undefined
          ? "You can apply in one tap."
          : `Add your ${labelOf(String(nextMissing)).toLowerCase()} to apply in one tap.`}
      </Text>
      {!data.ready ? (
        <SeekButton
          label="Finish"
          compact
          onPress={() => router.navigate("/(app)/(tabs)/passport")}
          accessibilityLabel="Finish your Seek Passport"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { gap: 8, paddingRight: 16 },
  chip: { paddingHorizontal: 14, height: 34, borderRadius: 17, borderWidth: 1, justifyContent: "center" },
  chipText: { fontSize: 13, fontWeight: "600" },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  bannerText: { flex: 1, fontSize: 13, lineHeight: 18 },
  bannerStrong: { fontWeight: "700" },
});
