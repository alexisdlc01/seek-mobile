/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * demo: the IMAP sign-in failed outside production, so the demo mailbox was connected instead.
 */
export type ImapConnectResultDtoMode = typeof ImapConnectResultDtoMode[keyof typeof ImapConnectResultDtoMode];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ImapConnectResultDtoMode = {
  imap: 'imap',
  demo: 'demo',
} as const;
