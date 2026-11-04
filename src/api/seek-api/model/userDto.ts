/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UserDtoRole } from './userDtoRole';

export interface UserDto {
  _id: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  universityDetails?: string;
  role: UserDtoRole;
  profilePicUrl?: string;
  isVerified: string;
  lastSeen: string;
}
