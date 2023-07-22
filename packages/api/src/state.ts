import { atom } from 'recoil';
import { Transaction } from './model';

export const selectedOrderIdsState = atom<string[]>({
  key: 'selectedOrderIds',
  default: [],
});

/**
 * The list of transactions
 */
export const transactionsState = atom<Transaction[]>({
  key: 'transactions',
  default: [],
});

/**
 * Feature flag for debug mode
 */
export const isDebugModeEnabledState = atom<boolean>({
  key: 'isDebugModeEnabled',
  default: true,
});