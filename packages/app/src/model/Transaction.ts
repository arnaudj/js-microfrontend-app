export type OrderId = string;

export interface Transaction {
  date: string;
  instrument: string;
  side: Side;
  price: number;
  quantity: number;
  orderId: OrderId;
}

export enum Side {
  None = 'none',
  Buy = 'buy',
  Sell = 'sell',
}
