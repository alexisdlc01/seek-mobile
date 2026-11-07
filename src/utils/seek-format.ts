const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Pence to pounds: "£695", "£42.38". Whole pounds drop the decimals. */
export function formatPence(pence: number | null | undefined): string {
  const value = (pence ?? 0) / 100;
  const whole = Number.isInteger(value);
  const text = value.toLocaleString("en-GB", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `£${text}`;
}

/** "1 Dec" (UTC, so a date stored as midnight UTC never slips a day). */
export function formatDay(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
}

/** "1 Dec 2026". */
export function formatDate(iso: string | null | undefined): string {
  const day = formatDay(iso);
  return day ? `${day} ${new Date(iso as string).getUTCFullYear()}` : "";
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

/** "Maya Student" -> "MS". */
export function initialsOf(name: string | null | undefined): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}
