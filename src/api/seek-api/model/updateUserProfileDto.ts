/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import type { RegistrationInputDto } from './registrationInputDto';
import type { NotificationPrefsInputDto } from './notificationPrefsInputDto';

export interface UpdateUserProfileDto {
  name?: string;
  /** A unique username using letters, numbers, dots, underscores, or hyphens. Send an empty string to clear it. */
  username?: string;
  /** Send an empty string to clear it. */
  phone?: string;
  /** ISO date (YYYY-MM-DD). Send an empty string to clear it. */
  dateOfBirth?: string;
  /** Send an empty string to clear it. */
  universityDetails?: string;
  /** Landlord company name. Send an empty string to clear it. */
  companyName?: string;
  /** Replaces the landlord's registrations. Verification is kept for unchanged numbers. */
  registrations?: RegistrationInputDto[];
  notificationPrefs?: NotificationPrefsInputDto;
  /** Stripe Connect account (acct_...) that receives rent payouts. Landlords only. Empty string clears it. */
  stripeAccountId?: string;
}
