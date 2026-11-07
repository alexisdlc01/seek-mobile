/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface DeductionResponse {
  user: string;
  accepted: boolean;
  note?: string;
  at: string;
}
