/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ConnectionMatchDto {
  name: string;
  email: string;
  /** @nullable */
  lastMessageAt: string | null;
}
