import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const editableBlogAtom = atom({
  key: "editableBlog",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
