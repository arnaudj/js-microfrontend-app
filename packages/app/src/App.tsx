import React from 'react';
import { RecoilRoot } from 'recoil';
import MainPage from './MainPage';
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
        <MainPage />
      </RecoilRoot>
    </>
  );
};

export default App;
