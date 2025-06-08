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
export const CurrentOrderState = atom({
  key: "order",
  default: { fan: 0, cookies: 0, mathri: 0, paperCup: 0 },
  effects_UNSTABLE: [persistAtom],
});
