import { AXIOS_INSTANCE } from "./custom-axios";
import type { ApplicationDto } from "../api/seek-api/model";

export type ApplicationInvite = {
  inviteToken: string;
  expiresAt: string;
};

/**
 * Mints a fresh invite secret for an application.
 *
 * The application id is a route parameter and travels in shareable chat URLs,
 * so it cannot be what authorizes joining. The share link carries this secret
 * alongside it, and minting a new one invalidates whatever was shared before.
 *
 * Hand-written rather than generated: run `npx orval` after the next swagger
 * export to replace this with the typed client function.
 */
export async function createApplicationInvite(
  applicationId: string,
): Promise<ApplicationInvite> {
  const { data } = await AXIOS_INSTANCE.post<ApplicationInvite>(
    `/application/${applicationId}/invite`,
  );
  return data;
}

/** Removes the current user from an application group. Hand-written, as above. */
export async function leaveApplication(applicationId: string): Promise<void> {
  await AXIOS_INSTANCE.patch(`/application/${applicationId}/leave`);
}

/** Group admins: the creator, and the landlord once the application is sent. */
export function isApplicationAdmin(
  application: ApplicationDto | undefined,
  userId: string | undefined,
): boolean {
  if (!application || !userId) return false;
  return (
    application.owner === userId ||
    (application.landlord === userId && application.stage !== "NOT_SENT")
  );
}
