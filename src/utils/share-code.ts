/** "r7k 4p2-9qx" -> "R7K4P29QX"; null unless it is 9 letters or digits (GOV.UK share code). */
export function normaliseShareCode(input: string): string | null {
  const code = input.replace(/[\s-]/g, "").toUpperCase();
  return /^[A-Z0-9]{9}$/.test(code) ? code : null;
}

/** "R7K4P29QX" -> "R7K 4P2 9QX". */
export function formatShareCode(code: string): string {
  return code.replace(/(.{3})(?=.)/g, "$1 ");
}

/** "2031-04-30" -> ISO at UTC midnight; null when it is not a real calendar date. */
export function isoDay(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value) ? date.toISOString() : null;
}

/** GOV.UK share code expiry "YYYY-MM-DD" -> ISO; null unless a real day from today to 90 days ahead (codes last 90 days). */
export function shareCodeExpiry(value: string): string | null {
  const iso = isoDay(value);
  const now = new Date();
  const days = iso ? (Date.parse(iso) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 86_400_000 : -1;
  return days >= 0 && days <= 90 ? iso : null;
}
