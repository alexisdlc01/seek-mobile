import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKVStorage } from "./persist/mmkv";
import { ListingsControllerGetFilteredListingsParams } from "../api/seek-api/model";

export type FilterParams = Partial<ListingsControllerGetFilteredListingsParams>;

type FilterState = {
  data: FilterParams
  setValue: <K extends keyof FilterParams>(key: K)
    => (value: FilterParams[K]) => void;
  clear: () => void;
};

const defaultFilters: FilterParams = {
  amenities: [],
};

const PROPERTY_TYPE_ALIASES: Record<string, FilterParams["propertyType"]> = {
  flat: "FLAT_APARTMENT",
  flat_apartment: "FLAT_APARTMENT",
  house: "HOUSE",
  room: "ROOM_IN_SHARED_HOUSE",
  room_in_shared_house: "ROOM_IN_SHARED_HOUSE",
  studio: "STUDIO",
  other: "OTHER",
};

const AMENITY_ALIASES: Record<string, string> = {
  wifi: "WiFi",
  washing_machine: "Washing_Machine",
  dryer: "Dryer",
  dishwasher: "Dishwasher",
  pets_allowed: "Pets_Allowed",
  bike_storage: "Bike Storage",
  parking: "Parking",
  garden: "Garden",
  smoke_alarm: "Smoke_Alarm",
  fireplace: "Fireplace",
  monoxide_alarm: "Monoxide_Alarm",
  carbon_monoxide_alarm: "Monoxide_Alarm",
};

export function getActiveFilters(
  filters: FilterParams,
): ListingsControllerGetFilteredListingsParams {
  return Object.fromEntries(
    Object.entries(filters).filter(([, rawValue]) => {
      if (Array.isArray(rawValue)) {
        return rawValue.length > 0;
      }
      if (typeof rawValue === "number") {
        return rawValue > 0;
      }
      if (typeof rawValue === "string") {
        return rawValue.length > 0;
      }
      return rawValue !== undefined && rawValue !== null;
    }),
  ) as ListingsControllerGetFilteredListingsParams;
}

function normalizeFilters(value: unknown): FilterParams {
  if (!value || typeof value !== "object") {
    return defaultFilters;
  }

  const candidate = value as Partial<FilterState> & FilterParams;
  const data = "data" in candidate && candidate.data
    ? candidate.data
    : candidate;
  const propertyTypeKey = typeof data.propertyType === "string"
    ? normalizeToken(data.propertyType)
    : "";
  const amenities = Array.isArray(data.amenities)
    ? [...new Set(
      data.amenities
        .filter((amenity): amenity is string => typeof amenity === "string")
        .map((amenity) => AMENITY_ALIASES[normalizeToken(amenity)] ?? amenity),
    )]
    : [];

  return {
    ...defaultFilters,
    ...data,
    propertyType: PROPERTY_TYPE_ALIASES[propertyTypeKey],
    amenities,
  };
}

function normalizeToken(value: string): string {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      data: defaultFilters,
      setValue: (key) => (value) =>
        set(state => ({
          ...state,
          data: {
            ...state.data,
            [key]: value
          }
        })),
      clear: () => set({ data: defaultFilters }),
    }),
    {
      name: "filter-store",
      storage: createJSONStorage(() => MMKVStorage),
      partialize: (state) => ({ data: state.data }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        data: normalizeFilters(persistedState),
      }),
    },
  ),
);
