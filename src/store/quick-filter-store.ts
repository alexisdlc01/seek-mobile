import { create } from "zustand";

/**
 * The "From Sept" quick filter on the Find screen. The API has no move-in
 * filter, so the map applies it to the homes it already loaded. Not persisted.
 */
type QuickFilterState = {
  fromSeptember: boolean;
  toggleFromSeptember: () => void;
};

export const useQuickFilters = create<QuickFilterState>((set) => ({
  fromSeptember: false,
  toggleFromSeptember: () => set((state) => ({ fromSeptember: !state.fromSeptember })),
}));
