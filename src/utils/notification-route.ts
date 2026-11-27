import { resolveAdviceLink } from "@/components/seek/advice-card";
import type { Notification } from "@/src/api/seek-api/model";
import type { Href } from "expo-router";

/** The paths the API may send in `target.mobile` (SeekBackend notifications/links.ts). */
const MOBILE_ROUTES = new Set<string>([
  "/(app)/(tabs)/rent",
  "/(app)/deposit",
  "/(app)/(tabs)/my-home",
  "/(app)/contract",
  "/(app)/repairs",
  "/(app)/(tabs)/applied",
]);

const TENANCY_SCOPED = new Set<string>(["/(app)/deposit", "/(app)/contract", "/(app)/(tabs)/my-home"]);

/** Where a notification leads in the app: its mobile path, then its web link. */
export function routeForNotification(notification: Notification): Href | null {
  const target = notification.target;
  if (typeof target?.mobile === "string" && target.mobile.startsWith("/(app)/chat/") && typeof target.id === "string" && target.id) return { pathname: "/(app)/chat/[id]", params: { id: target.id } } as Href;
  if (typeof target?.mobile === "string" && MOBILE_ROUTES.has(target.mobile)) {
    // Deposit deductions concern the tenancy in target.id, which may not be the student's current one.
    // Same for contracts and the tenancy home (next year's tenancy); the screens fall back to the current one for an unknown id.
    if (TENANCY_SCOPED.has(target.mobile) && typeof target.id === "string" && target.id) return { pathname: target.mobile, params: { tenancy: target.id } } as Href;
    return target.mobile as Href;
  }
  const link = notification.link ? resolveAdviceLink(notification.link) : null;
  return link?.kind === "route" ? link.href : null;
}
