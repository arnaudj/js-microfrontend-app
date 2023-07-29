import {
  NONCE,
  Side,
  Transaction,
  VERSION,
  isDebugModeEnabledState,
  selectedOrderIdsState,
  transactionsState,
} from 'api';
import { Typography } from 'ds/Typography';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { transactionsServiceState } from '../../state';
import { isMarketMakerModeEnabledState } from '../../state/state';
import TransactionsGrid from './TransactionsGrid';

interface TransactionsContainerProps {}

export function TransactionsGridContainer(props: TransactionsContainerProps) {
  const transactionsService = useRecoilValue(transactionsServiceState);
  const [selectedOrderIds, setSelectedOrderIds] = useRecoilState(selectedOrderIdsState);
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const isDebugModeEnabled = useRecoilValue(isDebugModeEnabledState);
  const isMarketMakerModeEnabled = useRecoilValue(isMarketMakerModeEnabledState);

  useEffect(() => {
    console.log('App selectedOrderIds changed: ', selectedOrderIds);
  }, [selectedOrderIds]);

  useEffect(() => {
    if (!transactionsService) return;
    transactionsService.getTransactions().then((data) => setTransactions(data));
  }, [transactionsServiceState]);

  useEffect(() => {
    if (!isMarketMakerModeEnabled || !transactionsService) return;

    const interval = setInterval(() => {
      transactionsService.getTransactions().then((data) =>
        setTransactions([
          ...data,
          {
            date: new Date().toISOString().replace('T', ' ').replace(/\..*/, ''),
            instrument: 'BTC-USD',
            side: Side.Buy,
            price: 20000 + Math.floor(Math.random() * (200 - 1) + 1),
            quantity: Number((Math.random() * (0.05 - 0.01) + 0.01).toFixed(2)),
            orderId: 'cb_oid_377160001',
          } as Transaction,
        ])
      );
    }, 800);
    return () => clearInterval(interval);
  }, [isMarketMakerModeEnabled, transactionsService]);

  return (
    <div style={{ border: isDebugModeEnabled ? 'dashed blue' : undefined }}>
      <TransactionsGrid
        rowData={transactions}
        onSelectionChange={(selection: string[]) => setSelectedOrderIds(selection)}
        containerProps={{
          className: 'ag-theme-alpine',
          style: {
            width: 710,
            height: 460,
          },
        }}
      />
      {isDebugModeEnabled && (
        <Typography variant="body1">
          App running with API: version={VERSION}, nonce={NONCE}
        </Typography>
      )}
    </div>
  );
}
