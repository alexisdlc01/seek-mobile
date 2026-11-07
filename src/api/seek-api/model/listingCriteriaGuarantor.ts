/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingCriteriaGuarantor = typeof ListingCriteriaGuarantor[keyof typeof ListingCriteriaGuarantor];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingCriteriaGuarantor = {
  UK_ONLY: 'UK_ONLY',
  UK_OR_SERVICE: 'UK_OR_SERVICE',
  NONE: 'NONE',
} as const;
