/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { UserDtoRole } from './userDtoRole';
import type { RegistrationDto } from './registrationDto';
import type { NotificationPrefsDto } from './notificationPrefsDto';
import type { UserDtoPayoutBank } from './userDtoPayoutBank';
import type { UserDtoTeamOf } from './userDtoTeamOf';

export interface UserDto {
  _id: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  universityDetails?: string;
  role: UserDtoRole;
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
  registrations?: RegistrationDto[];
  notificationPrefs?: NotificationPrefsDto;
  /** Whether rent payouts are connected (landlords). */
  payoutsConnected?: boolean;
  /**
   * Where payouts go (landlords): { last4, bankName, verified }. Null until Stripe has a bank account.
   * @nullable
   */
  payoutBank?: UserDtoPayoutBank;
  /**
   * Set when this account is on a landlord's team: whose account it helps run.
   * @nullable
   */
  teamOf?: UserDtoTeamOf;
}
