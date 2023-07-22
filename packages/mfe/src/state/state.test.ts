import { Side, Transaction, selectedOrderIdsState, transactionsState } from 'api';
import { SetRecoilState, Snapshot, snapshot_UNSTABLE } from 'recoil';
import { activeTransactionsState, activePositionsState } from './state';
import { Position } from '../model';

function initState(set: SetRecoilState, transactions: Transaction[], selectedOrderIds: string[]) {
  set(transactionsState, transactions);
  set(selectedOrderIdsState, selectedOrderIds);
}

describe('given transactions T1, T2, T3 on AAPL', () => {
  const transaction_AAPL_1 = {
    date: '2023-02-06 11:33:37',
    instrument: 'AAPL-USD',
    side: Side.Buy,
    price: 151,
    quantity: 1,
    orderId: 'OID_AAPL_1',
  } as Transaction;

  const transaction_AAPL_2 = {
    date: '2023-06-01 11:33:37',
    instrument: 'AAPL-USD',
    side: Side.Buy,
    price: 180,
    quantity: 1,
    orderId: 'OID_AAPL_2',
  } as Transaction;

  const transaction_AAPL_3 = {
    date: '2023-06-11 11:33:37',
    instrument: 'AAPL-USD',
    side: Side.Sell,
    price: 190,
    quantity: 0.4,
    orderId: 'OID_AAPL_3',
  } as Transaction;

  beforeEach(() => {
    const snapshot0 = snapshot_UNSTABLE();
    expect(snapshot0.getLoadable(transactionsState).valueOrThrow()).toEqual([]);
    expect(snapshot0.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([]);
  });

  describe('with partial selection T1, T3', () => {
    let snapshot: Snapshot | null = null;

    beforeEach(() => {
      snapshot = snapshot_UNSTABLE(({ set }) => {
        initState(
          set,
          [transaction_AAPL_1, transaction_AAPL_2, transaction_AAPL_3],
          [transaction_AAPL_1.orderId, transaction_AAPL_3.orderId]
        );
      });
    });

    test('when deriving active transactions then expect T1,T3 are selected and T2 is skipped', () => {
      expect(snapshot!!.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([
        transaction_AAPL_1,
        transaction_AAPL_3,
      ]);
    });

    test('when deriving positions then expect position on AAPL is T1(buy)-T3(sell)', () => {
      expect(snapshot!!.getLoadable(activePositionsState).valueOrThrow()).toEqual(
        new Map<string, Position>([
          [
            transaction_AAPL_1.instrument,
            {
              instrument: transaction_AAPL_1.instrument,
              quantity: 0.6,
              realizedPNL: -1 * 151 + 0.4 * 190,
            },
          ],
        ])
      );
    });
  });

  describe('with empty selection', () => {
    let snapshot: Snapshot | null = null;

    beforeEach(() => {
      snapshot = snapshot_UNSTABLE(({ set }) => {
        initState(set, [transaction_AAPL_1, transaction_AAPL_2, transaction_AAPL_3], []);
      });
    });

    test('when deriving active transactions then expect empty array', () => {
      expect(snapshot!!.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([]);
    });

    test('when deriving positions then expect no position', () => {
      expect(snapshot!!.getLoadable(activePositionsState).valueOrThrow()).toEqual(new Map<string, Position>([]));
    });
  });
});
