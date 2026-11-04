/**
 * Generated-like client model for PATCH /users/me.
 */
export interface UpdateUserProfileDto {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  /** ISO calendar date in YYYY-MM-DD format, or an empty string to clear. */
  dateOfBirth?: string;
  universityDetails?: string;
}
