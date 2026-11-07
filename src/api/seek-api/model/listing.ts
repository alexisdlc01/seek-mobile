/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ListingPropertyType } from './listingPropertyType';
import type { ListingFurnishingStatus } from './listingFurnishingStatus';
import type { ListingEpcRating } from './listingEpcRating';
import type { ListingNation } from './listingNation';
import type { ListingCriteria } from './listingCriteria';
import type { ListingPaymentPlansItem } from './listingPaymentPlansItem';
import type { ViewingSlotAvailability } from './viewingSlotAvailability';
import type { RequiredDocumentInfo } from './requiredDocumentInfo';
import type { ListingLocation } from './listingLocation';

export interface Listing {
  _id: string;
  landlord: string;
  propertyTitle: string;
  numOfPeople: number;
  sizeSqMeters: number;
  propertyType: ListingPropertyType;
  bedroomsCount: number;
  enSuiteBedroomCount: number;
  bathrooms: number;
  registerOfTitleKey: string;
  registrationNumber: string;
  propertyDesc: string;
  amenities: string[];
  streetAddress: string;
  cityTown: string;
  postcodeZIP: string;
  country: string;
  monthlyRent: number;
  securityDeposit: number;
  availableFrom: string;
  availableUntil: string;
  furnishingStatus: ListingFurnishingStatus;
  epcRating: ListingEpcRating;
  photos: string[];
  videoTourLink: string;
  floorPlanImage: string;
  requirements: string[];
  isVerified: boolean;
  isDraft: boolean;
  lastUpdated: string;
  likedBy: string[];
  nation: ListingNation;
  billsIncluded: boolean;
  /** @nullable */
  gasSafetyExpiry?: string | null;
  /** @nullable */
  eicrExpiry?: string | null;
  /** @nullable */
  epcExpiry?: string | null;
  /** @nullable */
  hmoLicenceExpiry?: string | null;
  licenceNumber?: string;
  /** Holding deposit per room, in whole pounds. Capped at one week's rent (rent x 12 / 52). */
  holdingDeposit?: number;
  criteria?: ListingCriteria;
  /** Rent plans tenants may pick. Monthly only for properties in England. */
  paymentPlans: ListingPaymentPlansItem[];
  /** Viewing times the landlord offers. */
  viewingSlots: string[];
  /** Households that can book the same viewing slot. */
  viewingSlotCapacity: number;
  /** Places left per viewing slot. Returned by GET /listings/{id} and on the student's own applications. */
  viewingSlotAvailability?: ViewingSlotAvailability[];
  /** Documents a student must have uploaded to apply, from the requirements and criteria (no guarantor when the criterion is NONE). Returned by GET /listings/{id}. */
  requiredDocuments?: RequiredDocumentInfo[];
  /** Times the public listing page was opened. */
  views: number;
  /** Last wizard step saved on a draft (1-4). */
  draftStep?: number;
  /**
   * GeoJSON point, [lng, lat]. Null when the address could not be geocoded.
   * @nullable
   */
  location?: ListingLocation;
}
