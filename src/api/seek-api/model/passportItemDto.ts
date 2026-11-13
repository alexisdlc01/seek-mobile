/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PassportItemDtoType } from './passportItemDtoType';
import type { PassportItemDtoStatus } from './passportItemDtoStatus';
import type { PassportItemDtoUrl } from './passportItemDtoUrl';
import type { PassportItemDtoKey } from './passportItemDtoKey';
import type { PassportItemDtoSource } from './passportItemDtoSource';

export interface PassportItemDto {
  type: PassportItemDtoType;
  label: string;
  status: PassportItemDtoStatus;
  required: boolean;
  /** @nullable */
  expiresAt: string | null;
  /** @nullable */
  uploadedAt: string | null;
  /**
   * Only for the owner or a viewer with an active share.
   * @nullable
   */
  url?: PassportItemDtoUrl;
  /**
   * Only for the owner or a viewer with an active share.
   * @nullable
   */
  key?: PassportItemDtoKey;
  /**
   * Where the item came from. Student status can come from a confirmed university email; "request" means Seek emailed a guarantor or referee and is waiting on their reply (status PENDING).
   * @nullable
   */
  source?: PassportItemDtoSource;
  /**
   * E.g. the confirmed university email, or the name of the guarantor or referee asked. Only for the owner or a viewer with an active share.
   * @nullable
   */
  detail?: string | null;
  /**
   * When Seek emailed the guarantor or referee (source "request" only).
   * @nullable
   */
  requestedAt?: string | null;
  /**
   * Status REJECTED only: what to fix, from the automatic review. Only for the owner or a viewer with an active share.
   * @nullable
   */
  reason?: string | null;
}
