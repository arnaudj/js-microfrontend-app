import React from 'react';
import { RecoilRoot } from 'recoil';
import TransactionsPage from './TransactionsPage';
import { transactionsServiceState } from './state';
import { TransactionServiceDummyImpl } from './services/TransactionsService';

const App = () => {
  return (
    <>
      <RecoilRoot
        initializeState={({ set }) => {
          set(transactionsServiceState, new TransactionServiceDummyImpl());
        }}
      >
        <TransactionsPage />
      </RecoilRoot>
    </>
  );
};

export default App;
