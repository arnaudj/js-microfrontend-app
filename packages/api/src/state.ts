import { atom } from "recoil";

export const selectedOrderIdsState = atom<string[]>({
  key: 'selectedOrderIds',
  default: [],
});