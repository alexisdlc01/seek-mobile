import { AXIOS_INSTANCE } from "./custom-axios";

export type ReportIssuePayload = {
  message: string;
  reportedAccount?: string;
};

/**
 * Sends an abuse report to the moderation inbox.
 *
 * Deliberately separate from the contact form: reporting is a safety control
 * and must not be starved by the contact form's quota.
 *
 * Hand-written rather than generated: run `npx orval` after the next swagger
 * export to replace this with the typed client function.
 */
export async function reportIssue(
  payload: ReportIssuePayload,
): Promise<{ message: string }> {
  const { data } = await AXIOS_INSTANCE.post<{ message: string }>(
    "/contact/report",
    payload,
  );
  return data;
}
