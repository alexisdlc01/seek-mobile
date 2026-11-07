/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PassportItemDtoType } from './passportItemDtoType';
import type { PassportItemDtoStatus } from './passportItemDtoStatus';
import type { PassportItemDtoUrl } from './passportItemDtoUrl';
import type { PassportItemDtoKey } from './passportItemDtoKey';

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
}
