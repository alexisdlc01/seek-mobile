/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type EmailConnectionViewDtoProvider = typeof EmailConnectionViewDtoProvider[keyof typeof EmailConnectionViewDtoProvider];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EmailConnectionViewDtoProvider = {
  GMAIL: 'GMAIL',
  OUTLOOK: 'OUTLOOK',
  DEMO: 'DEMO',
  IMAP: 'IMAP',
} as const;
