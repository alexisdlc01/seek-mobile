/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type ProviderAvailabilityDtoProvider = typeof ProviderAvailabilityDtoProvider[keyof typeof ProviderAvailabilityDtoProvider];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProviderAvailabilityDtoProvider = {
  GMAIL: 'GMAIL',
  OUTLOOK: 'OUTLOOK',
  DEMO: 'DEMO',
  IMAP: 'IMAP',
} as const;
