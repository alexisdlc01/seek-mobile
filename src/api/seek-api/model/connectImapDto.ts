/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export interface ConnectImapDto {
  host: string;
  /** IMAP over TLS port (usually 993). */
  port: number;
  /** Usually your email address. */
  username: string;
  /** An app password from your email provider, not your normal password. Stored encrypted. */
  appPassword: string;
}
