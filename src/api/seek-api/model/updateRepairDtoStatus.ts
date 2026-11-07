/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type UpdateRepairDtoStatus = typeof UpdateRepairDtoStatus[keyof typeof UpdateRepairDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateRepairDtoStatus = {
  OPEN: 'OPEN',
  SCHEDULED: 'SCHEDULED',
  FIXED: 'FIXED',
} as const;
