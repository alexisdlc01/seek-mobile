/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxThreadDtoChannelsItem = typeof InboxThreadDtoChannelsItem[keyof typeof InboxThreadDtoChannelsItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxThreadDtoChannelsItem = {
  seek: 'seek',
  email: 'email',
} as const;
