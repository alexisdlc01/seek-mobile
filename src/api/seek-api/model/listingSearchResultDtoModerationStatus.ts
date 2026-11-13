/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Automatic check result; null until the listing is first checked.
 * @nullable
 */
export type ListingSearchResultDtoModerationStatus = typeof ListingSearchResultDtoModerationStatus[keyof typeof ListingSearchResultDtoModerationStatus] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingSearchResultDtoModerationStatus = {
  APPROVED: 'APPROVED',
  NEEDS_CHANGES: 'NEEDS_CHANGES',
  PENDING: 'PENDING',
} as const;
