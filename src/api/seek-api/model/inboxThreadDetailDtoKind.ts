/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxThreadDetailDtoKind = typeof InboxThreadDetailDtoKind[keyof typeof InboxThreadDetailDtoKind];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxThreadDetailDtoKind = {
  seek: 'seek',
  email: 'email',
} as const;
