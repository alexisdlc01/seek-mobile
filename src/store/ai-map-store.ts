import { create } from "zustand";
import type { SearchChatListingDto } from "../api/seek-api/model";

/**
 * Homes Seek AI found, handed to the Find map by "Show on map". While set, the
 * map shows these instead of the nearby search. Not persisted.
 */
type AiMapState = {
  results: SearchChatListingDto[] | null;
  show: (results: SearchChatListingDto[]) => void;
  clear: () => void;
};

export const useAiMapStore = create<AiMapState>((set) => ({
  results: null,
  show: (results) => set({ results }),
  clear: () => set({ results: null }),
}));
