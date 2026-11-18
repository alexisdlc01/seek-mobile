/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { PublicUserDtoRole } from './publicUserDtoRole';

export interface PublicUserDto {
  _id: string;
  name: string;
  username?: string;
  role: PublicUserDtoRole;
  /** Proved a university email address (student badge). */
  studentVerified: boolean;
  /**
   * University behind the badge, e.g. "University of St Andrews".
   * @nullable
   */
  university: string | null;
  profilePicUrl: string;
  isVerified: boolean;
  lastSeen: string;
  companyName?: string;
}
