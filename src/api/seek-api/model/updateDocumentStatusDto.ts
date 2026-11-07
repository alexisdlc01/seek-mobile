/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UpdateDocumentStatusDtoStatus } from './updateDocumentStatusDtoStatus';

export interface UpdateDocumentStatusDto {
  status: UpdateDocumentStatusDtoStatus;
  /** @nullable */
  expiresAt?: string | null;
}
