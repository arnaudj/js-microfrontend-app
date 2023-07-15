import { NONCE, VERSION, selectedOrderIdsState } from 'api';
import Typography from 'ds/Typography';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Transaction } from '../../model/Transaction';
import { transactionsServiceState } from '../../state';
import TransactionsGrid from './TransactionsGrid';

interface TransactionsContainerProps {}

export function TransactionsGridContainer(props: TransactionsContainerProps) {
  const transactionsService = useRecoilValue(transactionsServiceState);
  const [selectedOrderIds, setSelectedOrderIds] = useRecoilState(
    selectedOrderIdsState
  );
  const [rowData, setRowData] = useState<Transaction[]>([]);

  useEffect(() => {
    console.log('App selectedOrderIds changed: ', selectedOrderIds);
  }, [selectedOrderIds]);

  useEffect(() => {
    if (!transactionsService) return;
    transactionsService.getTransactions().then((data) => setRowData(data));
  }, [transactionsServiceState]);

  return (
    <>
      <TransactionsGrid
        rowData={rowData}
        onSelectionChange={(selection: string[]) =>
          setSelectedOrderIds(selection)
        }
      />
      <Typography variant="body1">
        App running with API: version={VERSION}, nonce={NONCE}
      </Typography>
    </>
  );
}
