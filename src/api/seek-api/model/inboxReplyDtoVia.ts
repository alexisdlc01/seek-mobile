/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

/**
 * Seek threads go through Seek unless this is email. Email threads always reply by email.
 */
export type InboxReplyDtoVia = typeof InboxReplyDtoVia[keyof typeof InboxReplyDtoVia];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxReplyDtoVia = {
  seek: 'seek',
  email: 'email',
} as const;
