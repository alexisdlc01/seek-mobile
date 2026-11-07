/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type EmailConnectionViewDtoStatus = typeof EmailConnectionViewDtoStatus[keyof typeof EmailConnectionViewDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EmailConnectionViewDtoStatus = {
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR',
  DISCONNECTED: 'DISCONNECTED',
} as const;
