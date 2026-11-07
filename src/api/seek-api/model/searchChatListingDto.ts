/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingCheckDto } from './listingCheckDto';

export interface SearchChatListingDto {
  id: string;
  title: string;
  /** @nullable */
  address: string | null;
  /** @nullable */
  city: string | null;
  /** @nullable */
  postcode: string | null;
  /** @nullable */
  lat: number | null;
  /** @nullable */
  lng: number | null;
  /**
   * Whole-property monthly rent, in pounds.
   * @nullable
   */
  monthlyRent: number | null;
  /**
   * Monthly rent per person, in pounds.
   * @nullable
   */
  rentPerPerson: number | null;
  /** @nullable */
  bedrooms: number | null;
  /** @nullable */
  bathrooms: number | null;
  billsIncluded: boolean;
  /** @nullable */
  availableFrom: string | null;
  /** @nullable */
  photo: string | null;
  /**
   * Distance to the university asked about, in km.
   * @nullable
   */
  distanceKm: number | null;
  /**
   * How well the home fits the search, in percent.
   * @minimum 40
   * @maximum 99
   */
  match: number;
  /** Why it fits, most important first. */
  reasons: string[];
  /** Budget, EPC and (for a student) the landlord's criteria against their Seek Passport. */
  checks: ListingCheckDto[];
}
