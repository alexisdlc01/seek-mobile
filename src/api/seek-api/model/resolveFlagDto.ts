/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { ResolveFlagDtoStatus } from './resolveFlagDtoStatus';

export interface ResolveFlagDto {
  status: ResolveFlagDtoStatus;
  /** Reply shown to the reporter. */
  supportResponse?: string;
}
