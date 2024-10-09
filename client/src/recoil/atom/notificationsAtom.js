import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const notificationsAtom = atom({
  key: "notifications",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
