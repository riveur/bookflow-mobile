import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import { setStorageItemAsync } from "@/hooks/useStorageState";
import { LoginResponse } from "@/lib/validation";

type State = {
  isLoading: boolean;
  token: LoginResponse["token"] | null;
};

type Actions = {
  init: (state: Pick<Required<State>, "token">) => void;
  clear: () => void;
};

const storageKey = "auth";

const initialState: State = {
  isLoading: true,
  token: null,
};

const useSessionStore = create<State & Actions>((set, get) => {
  SecureStore.getItemAsync(storageKey).then((value) => {
    if (value) {
      set({ token: value });
    }
    set({ isLoading: false });
  });
  return {
    ...initialState,
    init(state) {
      set({ ...state });
      setStorageItemAsync(storageKey, state.token).finally(() => {
        set({ isLoading: false });
      });
    },
    clear() {
      set({ ...initialState, isLoading: false });
      setStorageItemAsync(storageKey, initialState.token);
    },
  };
});

export { useSessionStore };
