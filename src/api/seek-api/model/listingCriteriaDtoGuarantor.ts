/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingCriteriaDtoGuarantor = typeof ListingCriteriaDtoGuarantor[keyof typeof ListingCriteriaDtoGuarantor];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingCriteriaDtoGuarantor = {
  UK_ONLY: 'UK_ONLY',
  UK_OR_SERVICE: 'UK_OR_SERVICE',
  NONE: 'NONE',
} as const;
