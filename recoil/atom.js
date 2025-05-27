import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-state",
  storage: AsyncStorage,
});

export const UserState = atom({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const LanguageState = atom({
  key: "language",
  default: "english",
  effects_UNSTABLE: [persistAtom],
});
