/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PendingDocumentDtoType } from './pendingDocumentDtoType';

export interface PendingDocumentDto {
  userId: string;
  /** @nullable */
  name: string | null;
  email: string;
  type: PendingDocumentDtoType;
  /** @nullable */
  uploadedAt: string | null;
  /**
   * Signed link to open the file, valid 60 seconds. Null if the file has no private key.
   * @nullable
   */
  url: string | null;
}
