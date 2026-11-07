import type { Listing, SearchChatListingDto } from "@/src/api/seek-api/model";

/**
 * "Match" for a home. Seek AI results come with the server's `match` and
 * `reasons` (see matchFromSummary). Homes from the plain map search have none,
 * so matchHome estimates one from budget, bedrooms, bills, move-in date and
 * distance.
 */
export type MatchInput = {
  /** Rent per person per month, in pounds. */
  rentPerPerson: number | null;
  bedrooms: number | null;
  billsIncluded: boolean;
  availableFrom: string | null;
  distanceKm: number | null;
};

export type MatchPrefs = {
  maxRent?: number;
  minBedrooms?: number;
  billsIncluded?: boolean;
  /** Latest date the student wants to move in (ISO). */
  moveInBy?: string | null;
};

export type Match = { percent: number; why: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** The 30 September that starts the next (or current) academic year. */
export function nextSeptember(now = new Date()): string {
  const year = now.getUTCMonth() > 8 ? now.getUTCFullYear() + 1 : now.getUTCFullYear();
  return new Date(Date.UTC(year, 8, 30)).toISOString();
}

export function inputFromListing(listing: Listing, distanceKm: number | null): MatchInput {
  const people = Math.max(1, listing.numOfPeople || 1);
  return {
    rentPerPerson: Math.round(listing.monthlyRent / people),
    bedrooms: listing.bedroomsCount,
    billsIncluded: listing.billsIncluded,
    availableFrom: listing.availableFrom,
    distanceKm,
  };
}

/** The score and reasons Seek AI computed on the server. */
export function matchFromSummary(listing: SearchChatListingDto): Match {
  const why = listing.reasons.slice(0, 2).join(" · ");
  return { percent: listing.match, why: why ? why.charAt(0).toUpperCase() + why.slice(1) : "Fits your search" };
}

/** Straight-line distance in km between two points. */
export function distanceKmBetween(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLng = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}

function travel(km: number): string {
  // Walking is about 12 min per km; beyond 1.6 km people cycle (about 4 min per km).
  return km <= 1.6 ? `${Math.max(1, Math.round(km * 12))} min walk` : `${Math.max(2, Math.round(km * 4))} min cycle`;
}

function freeFrom(iso: string): string {
  const date = new Date(iso);
  return `free ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
}

/**
 * @param distanceSuffix words after the travel time, e.g. "to campus" for AI
 *   results (distance to the university) or "away" on the map.
 */
export function matchHome(
  home: MatchInput,
  prefs: MatchPrefs = {},
  distanceSuffix = "away",
): Match {
  let score = 70;
  const reasons: { rank: number; text: string }[] = [];

  if (home.distanceKm != null) {
    if (home.distanceKm <= 1) score += 8;
    else if (home.distanceKm <= 2.5) score += 5;
    else if (home.distanceKm <= 4) score += 2;
    else if (home.distanceKm > 6) score -= 4;
    reasons.push({ rank: 1, text: `${travel(home.distanceKm)} ${distanceSuffix}` });
  }

  if (home.availableFrom) {
    const free = new Date(home.availableFrom).getTime();
    if (!Number.isNaN(free)) {
      if (prefs.moveInBy) {
        const by = new Date(prefs.moveInBy).getTime();
        if (!Number.isNaN(by)) score += free <= by ? 6 : -8;
      }
      reasons.push({ rank: 2, text: freeFrom(home.availableFrom) });
    }
  }

  if (home.billsIncluded) {
    score += prefs.billsIncluded ? 8 : 4;
    reasons.push({ rank: 3, text: "bills included" });
  } else if (prefs.billsIncluded) {
    score -= 10;
  }

  if (prefs.maxRent && home.rentPerPerson != null) {
    if (home.rentPerPerson <= prefs.maxRent) {
      score += 8;
      reasons.push({ rank: 4, text: `under £${prefs.maxRent}` });
    } else {
      score -= Math.min(20, Math.round(((home.rentPerPerson - prefs.maxRent) / prefs.maxRent) * 60));
    }
  }

  if (prefs.minBedrooms && home.bedrooms != null) {
    if (home.bedrooms >= prefs.minBedrooms) {
      score += 6;
      reasons.push({ rank: 5, text: `${home.bedrooms} bedrooms` });
    } else {
      score -= 8;
    }
  }

  const percent = Math.max(40, Math.min(99, Math.round(score)));
  const why = reasons
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 2)
    .map((reason) => reason.text)
    .join(" · ");
  return { percent, why: why ? why.charAt(0).toUpperCase() + why.slice(1) : "Fits your search" };
}
