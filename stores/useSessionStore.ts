import * as SecureStore from 'expo-secure-store';
import { create } from "zustand";

import { setStorageItemAsync } from "@/hooks/useStorageState";
import { LoginResponse } from "@/lib/validation";

type State = {
  token: LoginResponse['token'] | null;
};

type Actions = {
  init: (state: Required<State>) => void;
  clear: () => void;
}

const storageKey = 'auth';

const initialState: State = {
  token: null,
};

const useSessionStore = create<State & Actions>(
  (set, get) => {
    SecureStore.getItemAsync(storageKey).then((value) => {
      if (value) {
        set({ token: value });
      }
    });
    return {
      ...initialState,
      init(state) {
        set({ ...state })
        setStorageItemAsync(storageKey, state.token);
      },
      clear() {
        set({ ...initialState })
        setStorageItemAsync(storageKey, initialState.token);
      }
    };
  },
)

export { useSessionStore };

