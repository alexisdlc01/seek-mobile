/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ConfirmConnectorDto {
  /** The nonce from the seekapp://connectors?status=pending redirect. */
  nonce: string;
}
