/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type RentPlanPreviewItemDtoStatus = typeof RentPlanPreviewItemDtoStatus[keyof typeof RentPlanPreviewItemDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentPlanPreviewItemDtoStatus = {
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  LATE: 'LATE',
} as const;
