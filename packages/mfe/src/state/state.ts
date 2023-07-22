import { Side, Transaction, selectedOrderIdsState, transactionsState } from 'api';
import { atom, atomFamily, selector } from 'recoil';
import { Position } from '../model';

export const activeTransactionsState = selector<Transaction[]>({
  key: 'activeTransactions',
  get: ({ get }) => {
    const ret: Transaction[] = [];
    const transactions = get(transactionsState);
    const selectedOrderIds = get(selectedOrderIdsState);
    transactions.forEach((transaction) => {
      if (selectedOrderIds.findIndex((orderId) => orderId === transaction.orderId) !== -1) {
        ret.push(transaction);
      }
    });
    return ret;
  },
});

/**
 * Account position based on selected transactions
 */
export const activePositionsState = selector<Map<string, Position>>({
  key: 'activePositions',
  get: ({ get }) => {
    const positions = new Map<string, Position>();
    const activeTransactions = get(activeTransactionsState);
    activeTransactions.forEach((transaction) => {
      let pos = mapGetOrDefault(positions, transaction.instrument);
      updatePositionWithTransaction(pos, transaction);
    });
    return positions;
  },
});

export const instrumentPriceFamilyState = atomFamily<number, string>({
  key: 'instrumentPriceFamily',
  default: 0,
});

export const activePositionCashAllocationState = selector<Map<string, number>>({
  key: 'activePositionCashAllocation',
  get: ({ get }) => {
    const cashAllocByInstrument = new Map<string, number>();
    get(activePositionsState).forEach((position: Position) => {
      const price = get(instrumentPriceFamilyState(position.instrument));
      const capitalization = position.quantity * price;
      cashAllocByInstrument.set(position.instrument, capitalization);
    });
    return cashAllocByInstrument;
  },
});

function updatePositionWithTransaction(pos: Position, transaction: Transaction) {
  if (transaction.side === Side.Buy) {
    pos.quantity += transaction.quantity;
    pos.realizedPNL!! -= transaction.quantity * transaction.price;
  } else if (transaction.side === Side.Sell) {
    pos.quantity -= transaction.quantity;
    pos.realizedPNL!! += transaction.quantity * transaction.price;
  } else {
    throw new Error('Unknown position type for transaction ' + JSON.stringify(transaction));
  }
}

function mapGetOrDefault(map: Map<string, Position>, instrument: string): Position {
  let pos = map.get(instrument);
  if (!pos) {
    pos = {
      instrument: instrument,
      quantity: 0,
      realizedPNL: 0,
    };
    map.set(instrument, pos);
  }
  return pos;
}
