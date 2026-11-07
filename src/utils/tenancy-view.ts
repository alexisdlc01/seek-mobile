import { uploadControllerDownload } from "@/src/api/seek-api/upload";
import * as WebBrowser from "expo-web-browser";
import type {
  Notification,
  Repair,
  StudentPaymentDto,
  Tenancy,
} from "@/src/api/seek-api/model";

/**
 * The tenancy endpoints return populated documents (listing, landlord,
 * tenants, compliance) while the generated client types only know the raw
 * ids. These views describe what the API really sends; use the `as*` helpers
 * to narrow a generated value.
 */

export type ComplianceItemView = {
  kind: string;
  severity: "high" | "medium" | "low";
  message: string;
  dueDate: string;
};

export type ListingView = {
  _id: string;
  propertyTitle?: string;
  streetAddress?: string;
  cityTown?: string;
  postcodeZIP?: string;
  nation?: "ENGLAND" | "WALES" | "SCOTLAND" | "NORTHERN_IRELAND";
  billsIncluded?: boolean;
  numOfPeople?: number;
};

export type PersonView = { _id: string; name?: string };

export type TenancyView = Omit<Tenancy, "listing" | "landlord" | "tenants"> & {
  listing: ListingView;
  landlord: PersonView;
  tenants: PersonView[];
  compliance: ComplianceItemView[];
};

export function asTenancyView(tenancy: Tenancy): TenancyView {
  return tenancy as unknown as TenancyView;
}

export function tenancyTitle(tenancy: TenancyView): string {
  return tenancy.listing?.propertyTitle || tenancy.listing?.streetAddress || "Your home";
}

export type RepairView = Omit<Repair, "reportedBy"> & {
  reportedBy: PersonView | string;
};

export type NotificationView = Notification;

const OPEN_PAYMENT_STATUSES = ["SCHEDULED", "PENDING", "LATE", "FAILED"];

export function isOpenPayment(payment: StudentPaymentDto): boolean {
  return OPEN_PAYMENT_STATUSES.includes(payment.status);
}

/** The next instalment to pay: overdue first, otherwise the soonest due. */
export function nextPayment(payments: StudentPaymentDto[]): StudentPaymentDto | undefined {
  return payments
    .filter(isOpenPayment)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
}

export function frequencyLabel(frequency: string): string {
  return frequency === "SIX_MONTHS" ? "every 6 months" : frequency === "YEARLY" ? "yearly" : "monthly";
}

/** The id of a document the API may return populated or as a bare id. */
export function idOf(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "_id" in value) {
    const id = (value as { _id?: unknown })._id;
    return typeof id === "string" ? id : undefined;
  }
  return undefined;
}

export function errorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  const message = (error as { response?: { data?: { message?: string | string[] } } })
    ?.response?.data?.message;
  if (Array.isArray(message)) return message.join(" ");
  if (typeof message === "string" && message.length > 0) return message;
  return fallback;
}

/** England/Wales: five weeks' rent (Tenant Fees Act 2019). Scotland: two months' rent (Rent (Scotland) Act 1984). */
export function depositCapCheck(
  tenancy: Pick<TenancyView, "monthlyRent" | "depositAmount">,
  nation?: ListingView["nation"],
) {
  const weeklyRent = (tenancy.monthlyRent * 12) / 52;
  const scotland = nation === "SCOTLAND";
  const cap = scotland ? tenancy.monthlyRent * 2 : Math.floor(weeklyRent * 5);
  return {
    cap,
    weeks: weeklyRent > 0 ? tenancy.depositAmount / weeklyRent : 0,
    overCap: tenancy.depositAmount > cap,
    label: scotland ? "2 months" : "5 weeks",
  };
}

/** Scotland: 30 working days from the tenancy start (weekends skipped, bank holidays not). Elsewhere: 30 days from receipt. */
export function depositDeadline(
  tenancy: Pick<TenancyView, "startDate" | "depositReceivedAt">,
  nation?: ListingView["nation"],
): Date | null {
  if (nation !== "SCOTLAND") {
    return tenancy.depositReceivedAt ? new Date(Date.parse(tenancy.depositReceivedAt) + 30 * 86_400_000) : null;
  }
  if (!tenancy.startDate) return null;
  const due = new Date(tenancy.startDate);
  for (let left = 30; left > 0; ) {
    due.setUTCDate(due.getUTCDate() + 1);
    if (due.getUTCDay() !== 0 && due.getUTCDay() !== 6) left--;
  }
  return due;
}

export function depositDaysLeft(
  tenancy: Pick<TenancyView, "startDate" | "depositReceivedAt">,
  nation?: ListingView["nation"],
  now = Date.now(),
): number | null {
  const due = depositDeadline(tenancy, nation);
  if (!due) return null;
  const days = (due.getTime() - now) / 86_400_000;
  return nation === "SCOTLAND" ? Math.floor(days) : Math.ceil(days); // keeps the historical rounding per nation
}

export const isWebUrl = (url?: string | null) => !!url && /^https?:\/\//i.test(url);

/** Opens a stored file (signed access URL) or a plain web link in the in-app browser. Throws when there is no usable link. */
export async function openStoredFile({ key, url }: { key?: string | null; url?: string | null }) {
  const target = key ? await uploadControllerDownload({ key }) : url;
  if (!target || !isWebUrl(target)) throw new Error("no link");
  await WebBrowser.openBrowserAsync(target);
}
