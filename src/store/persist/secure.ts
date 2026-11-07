import { Platform } from "react-native";
import { StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

// expo-secure-store has no web implementation. The web build is for UI checks
// only: tokens go to localStorage in development, and in production to
// sessionStorage (cleared with the tab) so a deployed web build never keeps them
// at rest. Native keeps the encrypted store.
const webArea = () => (__DEV__ ? window.localStorage : window.sessionStorage);
const webStorage: StateStorage = {
  getItem: (key) => {
    try {
      return webArea().getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      webArea().setItem(key, value);
    } catch {
      // Storage unavailable (private mode): keep running without persistence.
    }
  },
  removeItem: (key) => {
    try {
      webArea().removeItem(key);
    } catch {
      // Nothing to remove.
    }
  },
};

const nativeStorage: StateStorage = {
  async setItem(key, value) {
    return await SecureStore.setItemAsync(key, value);
  },
  async getItem(key) {
    return (await SecureStore.getItemAsync(key)) ?? null;
  },
  async removeItem(key) {
    return await SecureStore.deleteItemAsync(key);
  },
};

export const SecureStorage: StateStorage =
  Platform.OS === "web" ? webStorage : nativeStorage;
