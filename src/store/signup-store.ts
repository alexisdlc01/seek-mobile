import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKVStorage } from "./persist/mmkv";

export type SignupStateData = {
  userId: string;
  email: string;
  /** @deprecated Session tokens belong in the auth store. */
  access_token?: string;
};

export interface SignupState {
  data: SignupStateData;
  setState: (value: SignupStateData) => void;
  clear: () => void;
}

const EMPTY_SIGNUP_STATE: SignupStateData = {
  userId: "",
  email: "",
};

export const useSignupState = create<SignupState>()(
  persist(
    (set) => ({
      data: EMPTY_SIGNUP_STATE,
      setState: (value) => set({ data: value }),
      clear: () => set({ data: EMPTY_SIGNUP_STATE }),
    }),
    {
      name: "pending-signup",
      storage: createJSONStorage(() => MMKVStorage),
      partialize: (state) => ({ data: state.data }),
    },
  ),
);
