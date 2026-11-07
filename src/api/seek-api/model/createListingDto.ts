/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { CreateListingDtoPropertyType } from './createListingDtoPropertyType';
import type { CreateListingDtoFurnishingStatus } from './createListingDtoFurnishingStatus';
import type { CreateListingDtoEpcRating } from './createListingDtoEpcRating';
import type { Step4ItemDto } from './step4ItemDto';
import type { CreateListingDtoNation } from './createListingDtoNation';
import type { ListingCriteriaDto } from './listingCriteriaDto';
import type { CreateListingDtoPaymentPlansItem } from './createListingDtoPaymentPlansItem';

export interface CreateListingDto {
  propertyTitle: string;
  numOfPeople: number;
  sizeSqMeters: number;
  propertyType: CreateListingDtoPropertyType;
  streetAddress: string;
  cityTown: string;
  postcodeZIP: string;
  country: string;
  bedroomsCount: number;
  enSuiteBedroomCount: number;
  bathrooms: number;
  propertyDesc: string;
  monthlyRent: number;
  securityDeposit: number;
  availableFrom: string;
  availableUntil: string;
  registerOfTitleKey: string;
  registrationNumber: string;
  furnishingStatus: CreateListingDtoFurnishingStatus;
  epcRating: CreateListingDtoEpcRating;
  photos: string[];
  videoTourLink: string;
  floorPlanImage: string;
  amenities: string[];
  requirements: Step4ItemDto[];
  nation?: CreateListingDtoNation;
  /** Bills (energy, water, Wi-Fi) are included in the rent. */
  billsIncluded?: boolean;
  /** @nullable */
  gasSafetyExpiry?: string | null;
  /** @nullable */
  eicrExpiry?: string | null;
  /** @nullable */
  epcExpiry?: string | null;
  /** @nullable */
  hmoLicenceExpiry?: string | null;
  /** HMO / selective licence or registration number. */
  licenceNumber?: string;
  /** Holding deposit per room in whole pounds (max one week's rent). */
  holdingDeposit?: number;
  criteria?: ListingCriteriaDto;
  /** Rent plans offered. Properties in England allow MONTHLY only. */
  paymentPlans?: CreateListingDtoPaymentPlansItem[];
  /** Viewing times offered to applicants. */
  viewingSlots?: string[];
  /**
   * Households that can book the same slot.
   * @minimum 1
   * @maximum 20
   */
  viewingSlotCapacity?: number;
}
