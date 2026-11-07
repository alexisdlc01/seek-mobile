import { Platform } from "react-native";
import { StateStorage } from "zustand/middleware";
import { createMMKV } from "react-native-mmkv";

function createNativeStorage(): StateStorage {
  const storage = createMMKV({
    id: "seek-store",
    readOnly: false,
  });
  return {
    setItem: (key, value) => storage.set(key, value),
    getItem: (key) => storage.getString(key) ?? null,
    removeItem: (key) => storage.remove(key),
  };
}

// MMKV is native only; the web build falls back to localStorage.
function createWebStorage(): StateStorage {
  return {
    getItem: (key) => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Storage unavailable: keep running without persistence.
      }
    },
    removeItem: (key) => {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Nothing to remove.
      }
    },
  };
}

export const MMKVStorage: StateStorage =
  Platform.OS === "web" ? createWebStorage() : createNativeStorage();
