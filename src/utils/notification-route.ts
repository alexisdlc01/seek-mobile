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

/** Where a notification leads in the app: its mobile path, then its web link. */
export function routeForNotification(notification: Notification): Href | null {
  const target = notification.target;
  if (typeof target?.mobile === "string" && MOBILE_ROUTES.has(target.mobile)) return target.mobile as Href;
  const link = notification.link ? resolveAdviceLink(notification.link) : null;
  return link?.kind === "route" ? link.href : null;
}
