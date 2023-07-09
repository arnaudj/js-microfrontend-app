import { atom } from 'recoil';
import { TransactionService } from '../services/TransactionsService';

export const transactionsServiceState = atom<TransactionService>({
  key: 'transactionsService',
});
