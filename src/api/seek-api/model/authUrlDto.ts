/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { AuthUrlDtoProvider } from './authUrlDtoProvider';

export interface AuthUrlDto {
  provider: AuthUrlDtoProvider;
  /** Open this URL to grant read and send access to the mailbox. */
  url: string;
}
