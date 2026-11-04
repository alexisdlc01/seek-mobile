import type { Listing } from "@/src/api/seek-api/model";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  FLAT_APARTMENT: "Flat / apartment",
  HOUSE: "House",
  ROOM_IN_SHARED_HOUSE: "Room in shared house",
  STUDIO: "Studio",
  OTHER: "Other",
};

const FURNISHING_LABELS: Record<string, string> = {
  furnished: "Furnished",
  unfurnished: "Unfurnished",
  part_furnished: "Part-furnished",
  partfurnished: "Part-furnished",
};

const AMENITY_LABELS: Record<string, string> = {
  wifi: "Wi-Fi",
  wi_fi: "Wi-Fi",
  washing_machine: "Washing machine",
  dishwasher: "Dishwasher",
  dryer: "Dryer",
  bike_storage: "Bike storage",
  parking: "Parking",
  garden: "Garden",
  smoke_alarm: "Smoke alarm",
  tv: "TV",
};

export function normalizeListingToken(value?: string | null): string {
  return (value ?? "")
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
}

function sentenceCaseToken(value?: string | null): string {
  const normalized = normalizeListingToken(value);
  if (!normalized) return "Not specified";

  const words = normalized.replace(/_/g, " ");
  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

export function formatPropertyType(value?: string | null): string {
  if (!value) return "Not specified";
  return PROPERTY_TYPE_LABELS[value.toUpperCase()] ?? sentenceCaseToken(value);
}

export function formatFurnishingStatus(value?: string | null): string {
  const normalized = normalizeListingToken(value);
  return FURNISHING_LABELS[normalized] ?? sentenceCaseToken(value);
}

export function formatAmenity(value?: string | null): string {
  const normalized = normalizeListingToken(value);
  return AMENITY_LABELS[normalized] ?? sentenceCaseToken(value);
}

export function formatListingDate(value?: string | null): string {
  if (!value) return "Not specified";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not specified";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatMonthlyRent(value?: number | null): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "Price unavailable";
  return `£${new Intl.NumberFormat("en-GB").format(value)} pcm`;
}

export function formatAddress(
  listing?: Pick<Listing, "streetAddress" | "cityTown" | "postcodeZIP"> | null,
): string {
  if (!listing) return "Address unavailable";

  const parts = [listing.streetAddress, listing.cityTown, listing.postcodeZIP]
    .map((part) => part?.trim())
    .filter((part, index, all): part is string => Boolean(part) && all.indexOf(part) === index);

  return parts.length > 0 ? parts.join(", ") : "Address unavailable";
}
