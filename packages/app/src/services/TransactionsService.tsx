import { Side, Transaction } from 'api/src/model/Transaction';

export interface TransactionService {
  getTransactions(): Promise<Transaction[]>;
}

export class TransactionServiceDummyImpl implements TransactionService {
  getTransactions(): Promise<Transaction[]> {
    return Promise.resolve([
      // BTC-USD
      {
        date: '2009-01-10 18:15:05',
        instrument: 'BTC-USD',
        side: Side.Buy,
        price: 1,
        quantity: 0.05,
        orderId: 'cb_oid_100598405',
      } as Transaction,
      {
        date: '2009-01-11 11:33:37',
        instrument: 'BTC-USD',
        side: Side.Buy,
        price: 2,
        quantity: 0.05,
        orderId: 'cb_oid_259240244',
      } as Transaction,
      {
        date: '2022-11-15 12:34:56',
        instrument: 'BTC-USD',
        side: Side.Buy,
        price: 17000,
        quantity: 0.01,
        orderId: 'cb_oid_377163784',
      } as Transaction,
      {
        date: '2022-11-16 12:34:56',
        instrument: 'BTC-USD',
        side: Side.Sell,
        price: 17100,
        quantity: 0.01,
        orderId: 'cb_oid_377163785',
      } as Transaction,
      // AAPL-USD
      {
        date: '2023-02-06 11:33:37',
        instrument: 'AAPL-USD',
        side: Side.Buy,
        price: 151,
        quantity: 1,
        orderId: 'brokerNDQ_oid_100000001',
      } as Transaction,
      {
        date: '2023-06-01 11:33:37',
        instrument: 'AAPL-USD',
        side: Side.Buy,
        price: 180,
        quantity: 1,
        orderId: 'brokerNDQ_oid_100000002',
      } as Transaction,
    ]);
  }
}
