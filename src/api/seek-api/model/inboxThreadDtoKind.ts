/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxThreadDtoKind = typeof InboxThreadDtoKind[keyof typeof InboxThreadDtoKind];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxThreadDtoKind = {
  seek: 'seek',
  email: 'email',
} as const;
