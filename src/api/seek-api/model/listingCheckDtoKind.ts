/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ListingCheckDtoKind = typeof ListingCheckDtoKind[keyof typeof ListingCheckDtoKind];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListingCheckDtoKind = {
  pass: 'pass',
  warn: 'warn',
} as const;
