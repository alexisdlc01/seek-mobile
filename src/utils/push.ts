import {
  notificationsControllerAddPushToken,
  notificationsControllerRemovePushToken,
} from "@/src/api/seek-api/notifications";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import type { Href } from "expo-router";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let registeredToken: string | undefined;

const projectId = () => Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

/** Call when signed out so the next user's sign-in registers again. */
export function forgetPushToken(): void {
  registeredToken = undefined;
}

/** Asks permission, gets the Expo push token and sends it to the API. Never throws. */
export async function registerForPush(): Promise<void> {
  if (Platform.OS === "web" || registeredToken) return;
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      ({ status } = await Notifications.requestPermissionsAsync());
    }
    if (status !== "granted") return;
    // shortcut: no expo-device, so simulators fall through to the catch (getExpoPushTokenAsync throws there).
    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId: projectId() });
    await notificationsControllerAddPushToken({ token });
    registeredToken = token;
  } catch (error) {
    console.warn("[push] registration skipped", error);
  }
}

/** Best effort: call BEFORE the auth token is cleared. */
export async function unregisterFromPush(): Promise<void> {
  if (Platform.OS === "web") return;
  try {
    const token =
      registeredToken ??
      (await Notifications.getExpoPushTokenAsync({ projectId: projectId() })).data;
    registeredToken = undefined;
    await notificationsControllerRemovePushToken({ token });
  } catch (error) {
    console.warn("[push] unregister failed", error);
  }
}

const NOTIFICATIONS_SCREEN = "/(app)/(tabs)/my-home" as Href;

/** Where a tapped push leads: `data.path` when it is an in-app route, else the My home tab (notifications list). */
export function hrefForPushResponse(response: Notifications.NotificationResponse): Href {
  const path = response.notification.request.content.data?.path;
  return typeof path === "string" && path.startsWith("/") ? (path as Href) : NOTIFICATIONS_SCREEN;
}
