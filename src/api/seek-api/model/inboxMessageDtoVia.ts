/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type InboxMessageDtoVia = typeof InboxMessageDtoVia[keyof typeof InboxMessageDtoVia];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InboxMessageDtoVia = {
  Seek: 'Seek',
  Email: 'Email',
} as const;
