/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Automatic check result; null until the listing is first checked.
 * @nullable
 */
export type ListingModerationStatus = typeof ListingModerationStatus[keyof typeof ListingModerationStatus] | null;


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingModerationStatus = {
  APPROVED: 'APPROVED',
  NEEDS_CHANGES: 'NEEDS_CHANGES',
  PENDING: 'PENDING',
} as const;
