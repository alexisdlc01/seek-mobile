/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type DisconnectResultDtoStatus = typeof DisconnectResultDtoStatus[keyof typeof DisconnectResultDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DisconnectResultDtoStatus = {
  DISCONNECTED: 'DISCONNECTED',
} as const;
