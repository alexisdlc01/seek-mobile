import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKVStorage } from "./persist/mmkv";

/**
 * Which kinds of connected-email threads the student wants to see in the Seek
 * inbox. This only hides threads on this device; what the server syncs is
 * still limited to housing emails.
 */
type InboxPrefsState = {
  hiddenEmailCategories: string[];
  toggleEmailCategory: (category: string) => void;
};

export const useInboxPrefs = create<InboxPrefsState>()(
  persist(
    (set, get) => ({
      hiddenEmailCategories: [],
      toggleEmailCategory: (category) => {
        const hidden = get().hiddenEmailCategories;
        set({
          hiddenEmailCategories: hidden.includes(category)
            ? hidden.filter((item) => item !== category)
            : [...hidden, category],
        });
      },
    }),
    {
      name: "seek-inbox-prefs",
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
);
