import { Side, Transaction, selectedOrderIdsState, transactionsState } from 'api';
import { SetRecoilState, Snapshot, snapshot_UNSTABLE } from 'recoil';
import { Position } from '../model';
import {
  activePositionCashAllocationState,
  activePositionsState,
  activeTransactionsState,
  instrumentPriceFamilyState,
} from './state';

const PRICE_BTCUSD = 21000;
const PRICE_AAPLUSD = 165;

function initState(set: SetRecoilState, transactions: Transaction[], selectedOrderIds: string[]) {
  set(transactionsState, transactions);
  set(selectedOrderIdsState, selectedOrderIds);
  set(instrumentPriceFamilyState('BTC-USD'), PRICE_BTCUSD);
  set(instrumentPriceFamilyState('AAPL-USD'), PRICE_AAPLUSD);
}

const transaction_T1_AAPL = {
  date: '2023-02-06 11:33:37',
  instrument: 'AAPL-USD',
  side: Side.Buy,
  price: 151,
  quantity: 1,
  orderId: 'OID_AAPL_1',
} as Transaction;

const transaction_T2_AAPL = {
  date: '2023-06-01 11:33:37',
  instrument: 'AAPL-USD',
  side: Side.Buy,
  price: 180,
  quantity: 1,
  orderId: 'OID_AAPL_2',
} as Transaction;

const transaction_T3_AAPL = {
  date: '2023-06-11 11:33:37',
  instrument: 'AAPL-USD',
  side: Side.Sell,
  price: 190,
  quantity: 0.4,
  orderId: 'OID_AAPL_3',
} as Transaction;

describe('given transactions T1, T2, T3 on AAPL', () => {
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
          [transaction_T1_AAPL, transaction_T2_AAPL, transaction_T3_AAPL],
          [transaction_T1_AAPL.orderId, transaction_T3_AAPL.orderId]
        );
      });
    });

    test('when deriving active transactions then expect T1,T3 are selected and T2 is skipped', () => {
      expect(snapshot!!.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([
        transaction_T1_AAPL,
        transaction_T3_AAPL,
      ]);
    });

    test('when deriving active positions then expect position on AAPL is T1(buy)-T3(sell)', () => {
      expect(snapshot!!.getLoadable(activePositionsState).valueOrThrow()).toEqual(
        new Map<string, Position>([
          [
            transaction_T1_AAPL.instrument,
            {
              instrument: transaction_T1_AAPL.instrument,
              quantity: 0.6,
              realizedPNL: -1 * 151 + 0.4 * 190,
            },
          ],
        ])
      );
    });

    test('when deriving active cash allocations then expect 0.6 AAPL at current price', () => {
      expect(snapshot!!.getLoadable(activePositionCashAllocationState).valueOrThrow()).toEqual(
        new Map<string, number>([[transaction_T1_AAPL.instrument, 0.6 * PRICE_AAPLUSD]])
      );
    });
  });

  describe('with empty selection', () => {
    let snapshot: Snapshot | null = null;

    beforeEach(() => {
      snapshot = snapshot_UNSTABLE(({ set }) => {
        initState(set, [transaction_T1_AAPL, transaction_T2_AAPL, transaction_T3_AAPL], []);
      });
    });

    test('when deriving active transactions then expect no transaction', () => {
      expect(snapshot!!.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([]);
    });

    test('when deriving active positions then expect no position', () => {
      expect(snapshot!!.getLoadable(activePositionsState).valueOrThrow()).toEqual(new Map<string, Position>([]));
    });

    test('when deriving active cash allocations then expect no allocation', () => {
      expect(snapshot!!.getLoadable(activePositionCashAllocationState).valueOrThrow()).toEqual(
        new Map<string, number>([])
      );
    });
  });
});

describe('given transactions T1 on AAPL and T10 on BTC', () => {
  const transaction_T10_BTC = {
    date: '2021-10-22 12:34:07',
    instrument: 'BTC-USD',
    side: Side.Buy,
    price: 52001,
    quantity: 0.01,
    orderId: 'OID_BTC_10',
  } as Transaction;

  beforeEach(() => {
    const snapshot0 = snapshot_UNSTABLE();
    expect(snapshot0.getLoadable(transactionsState).valueOrThrow()).toEqual([]);
    expect(snapshot0.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([]);
  });

  describe('with full selection', () => {
    let snapshot: Snapshot | null = null;

    beforeEach(() => {
      snapshot = snapshot_UNSTABLE(({ set }) => {
        initState(
          set,
          [transaction_T1_AAPL, transaction_T10_BTC],
          [transaction_T1_AAPL.orderId, transaction_T10_BTC.orderId]
        );
      });
    });

    test('when deriving active transactions then expect T1,T10 are selected', () => {
      expect(snapshot!!.getLoadable(activeTransactionsState).valueOrThrow()).toEqual([
        transaction_T1_AAPL,
        transaction_T10_BTC,
      ]);
    });

    test('when deriving active positions then expect position T1 for AAPL and T10 for BTC', () => {
      expect(snapshot!!.getLoadable(activePositionsState).valueOrThrow()).toEqual(
        new Map<string, Position>([
          [
            transaction_T1_AAPL.instrument,
            {
              instrument: transaction_T1_AAPL.instrument,
              quantity: transaction_T1_AAPL.quantity,
              realizedPNL: -1 * transaction_T1_AAPL.quantity * transaction_T1_AAPL.price,
            },
          ],
          [
            transaction_T10_BTC.instrument,
            {
              instrument: transaction_T10_BTC.instrument,
              quantity: transaction_T10_BTC.quantity,
              realizedPNL: -1 * transaction_T10_BTC.quantity * transaction_T10_BTC.price,
            },
          ],
        ])
      );
    });

    test('when deriving active cash allocations then expect computation is correct', () => {
      const total = 1 * 151 + 52001 * 0.01;
      expect(snapshot!!.getLoadable(activePositionCashAllocationState).valueOrThrow()).toEqual(
        new Map<string, number>([
          [transaction_T1_AAPL.instrument, 1 * PRICE_AAPLUSD],
          [transaction_T10_BTC.instrument, 0.01 * PRICE_BTCUSD],
        ])
      );
    });
  });
});
