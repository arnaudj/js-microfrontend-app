import { atom } from 'recoil';

export const isMarketMakerModeEnabledState = atom<boolean>({
  key: 'isMarketMakerModeEnabled',
  default: false
});
