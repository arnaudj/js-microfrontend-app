import { Side, Transaction } from '../model/Transaction';

export interface TransactionService {
  getTransactions(): Promise<Transaction[]>;
}

export class TransactionServiceDummyImpl implements TransactionService {
  getTransactions(): Promise<Transaction[]> {
    return Promise.resolve([
      {
        date: '2009-01-10 18:15:05',
        instrument: 'BTC',
        side: Side.Buy,
        price: 1,
        quantity: 0.05,
        orderId: 'cb_oid_100598405',
      } as Transaction,
      {
        date: '2009-01-11 11:33:37',
        instrument: 'BTC',
        side: Side.Buy,
        price: 2,
        quantity: 0.05,
        orderId: 'cb_oid_259240244',
      } as Transaction,
      {
        date: '2022-11-15 12:34:56',
        instrument: 'BTC',
        side: Side.Buy,
        price: 17000,
        quantity: 0.01,
        orderId: 'cb_oid_377163784',
      } as Transaction,
    ]);
  }
}
