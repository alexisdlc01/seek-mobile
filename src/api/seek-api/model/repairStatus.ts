/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type RepairStatus = typeof RepairStatus[keyof typeof RepairStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RepairStatus = {
  OPEN: 'OPEN',
  SCHEDULED: 'SCHEDULED',
  FIXED: 'FIXED',
} as const;
