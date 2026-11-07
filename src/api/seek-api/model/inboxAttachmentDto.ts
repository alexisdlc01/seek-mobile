/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface InboxAttachmentDto {
  name: string;
  /** Empty when the file could not be stored. */
  url: string;
  /**
   * Private storage key, for a signed download.
   * @nullable
   */
  key: string | null;
  /** @nullable */
  filedAs: string | null;
}
