import { atom } from "recoil";

export const selectedOrderIdsState = atom<string[]>({
  key: 'selectedOrderIds',
  default: [],
});

/**
 * Feature flag for debug mode
 */
export const isDebugModeEnabledState = atom<boolean>({
  key: 'isDebugModeEnabled',
  default: true,
});