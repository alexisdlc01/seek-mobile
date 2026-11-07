/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type UpdateDocumentStatusDtoStatus = typeof UpdateDocumentStatusDtoStatus[keyof typeof UpdateDocumentStatusDtoStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateDocumentStatusDtoStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  EXPIRED: 'EXPIRED',
  REJECTED: 'REJECTED',
} as const;
